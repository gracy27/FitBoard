import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  likedPhotos: [],
  photos: [],
  loading: false,
  error: null,
};

const photosSlice = createSlice({
  name: 'photos',
  initialState,
  reducers: {
    addLikedPhoto: (state, action) => {
      const photo = action.payload;
      const exists = state.likedPhotos.some(p => p.id === photo.id);
      if (!exists) {
        state.likedPhotos.push(photo);
      }
    },
    removeLikedPhoto: (state, action) => {
      state.likedPhotos = state.likedPhotos.filter(
        photo => photo.id !== action.payload
      );
    },
    setLikedPhotos: (state, action) => {
      state.likedPhotos = action.payload;
      state.error = null;
    },
    clearLikedPhotos: (state) => {
      state.likedPhotos = [];
    },
    setPhotos: (state, action) => {
      state.photos = action.payload;
      state.error = null;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
  },
});

export const {
  addLikedPhoto,
  removeLikedPhoto,
  setLikedPhotos,
  clearLikedPhotos,
  setPhotos,
  setLoading,
  setError,
} = photosSlice.actions;

export default photosSlice.reducer;
