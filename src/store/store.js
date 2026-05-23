import { configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/es/storage';
import photosReducer from './slices/photosSlice';
import moodboardsReducer from './slices/moodboardsSlice';
import userReducer from './slices/userSlice';
import { rootSaga } from './sagas/rootSaga';

const sagaMiddleware = createSagaMiddleware();

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['user', 'moodboards'],
};

const persistedReducer = persistReducer(persistConfig, (state, action) => ({
  photos: photosReducer(state?.photos, action),
  moodboards: moodboardsReducer(state?.moodboards, action),
  user: userReducer(state?.user, action),
}));

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST'],
      },
    }).concat(sagaMiddleware),
});

sagaMiddleware.run(rootSaga);

export const persistor = persistStore(store);

export default store;
