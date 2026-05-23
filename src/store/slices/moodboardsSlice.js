import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  moodboards: [],
  selectedMoodboard: null,
};

const moodboardsSlice = createSlice({
  name: 'moodboards',
  initialState,
  reducers: {
    addMoodboard: (state, action) => {
      state.moodboards.push(action.payload);
      state.looks = state.moodboards.reduce((total, board) => total + (board.photos ? board.photos.length : 0), 0);
    },
    removeMoodboard: (state, action) => {
      state.moodboards = state.moodboards.filter(
        board => board.id !== action.payload
      );
      state.looks = state.moodboards.reduce((total, board) => total + (board.photos ? board.photos.length : 0), 0);
    },
    updateMoodboard: (state, action) => {
      const index = state.moodboards.findIndex(
        board => board.id === action.payload.id
      );
      if (index !== -1) {
        state.moodboards[index] = action.payload;
      }
    },
    setMoodboards: (state, action) => {
      state.moodboards = action.payload;
    },
    selectMoodboard: (state, action) => {
      state.selectedMoodboard = action.payload;
    },
    addPhotoToMoodboard: (state, action) => {
      const { moodboardId, photo } = action.payload;
      const moodboard = state.moodboards.find(b => b.id === moodboardId);
      if (moodboard) {
        if (!moodboard.photos) {
          moodboard.photos = [];
        }
        const exists = moodboard.photos.some(p => p.id === photo.id);
        if (!exists) {
          moodboard.photos.push(photo);
        }
      }
    },
    removePhotoFromMoodboard: (state, action) => {
      const { moodboardId, photoId } = action.payload;
      const moodboard = state.moodboards.find(b => b.id === moodboardId);
      if (moodboard && moodboard.photos) {
        moodboard.photos = moodboard.photos.filter(p => p.id !== photoId);
      }
    },
    clearMoodboards: (state) => {
      state.moodboards = [];
      state.selectedMoodboard = null;
    },
  },
});

export const {
  addMoodboard,
  removeMoodboard,
  updateMoodboard,
  setMoodboards,
  selectMoodboard,
  addPhotoToMoodboard,
  removePhotoFromMoodboard,
  clearMoodboards,
} = moodboardsSlice.actions;

export default moodboardsSlice.reducer;
