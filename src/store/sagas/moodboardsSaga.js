import { put, takeEvery, select } from 'redux-saga/effects';
import { addMoodboard, addPhotoToMoodboard, setMoodboards } from '../slices/moodboardsSlice';
import { toast } from 'react-toastify';

function* createMoodboardSaga(action) {
  try {
    const { title, color } = action.payload;
    const moodboards = yield select(state => state.moodboards.moodboards);
    
    const newMoodboard = {
      id: Math.max(...moodboards.map(b => b.id || 0), 0) + 1,
      title,
      color,
      looks: 0,
      photos: [],
    };
    
    yield put(addMoodboard(newMoodboard));
    toast.success("Moodboard created!");
    
    // TODO: Save to Firebase
    // yield call(saveMoodboardToFirebase, newMoodboard, uid);
  } catch (error) {
    toast.error("Failed to create moodboard");
  }
}

function* addPhotoToMoodboardSaga(action) {
  try {
    const { boardId, photo } = action.payload;
    
    yield put(addPhotoToMoodboard({ moodboardId: boardId, photo }));
    toast.success("Photo added to moodboard!");
    
    // TODO: Update Firebase
    // const moodboard = yield select(state => 
    //   state.moodboards.moodboards.find(b => b.id === boardId)
    // );
    // yield call(updateMoodboardInFirebase, moodboard, uid);
  } catch (error) {
    toast.error("Failed to add photo to moodboard");
  }
}

export function* moodboardsSaga() {
  yield takeEvery('moodboards/CREATE_MOODBOARD', createMoodboardSaga);
  yield takeEvery('moodboards/ADD_PHOTO_TO_MOODBOARD', addPhotoToMoodboardSaga);
}
