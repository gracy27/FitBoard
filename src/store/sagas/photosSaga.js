import { put, takeEvery, call, select } from 'redux-saga/effects';
import { setPhotos, addLikedPhoto, removeLikedPhoto, setLikedPhotos, setLoading, setError } from '../slices/photosSlice';
import { fetchPhotos } from '../../api/unsplash';
import { savePhotoToFirebase, deletePhotoFromFirebase, fetchlikedPhotosFromFirebase } from '../../api/firebase';
import { toast } from 'react-toastify';

function* fetchPhotosSaga(action) {
  try {
    yield put(setLoading(true));
    const { query, page } = action.payload;
    const response = yield call(fetchPhotos, query, page);
    
    const currentPhotos = yield select(state => state.photos.photos);
    const allPhotos = [...currentPhotos, ...response.results];
    
    yield put(setPhotos(allPhotos));
  } catch (error) {
    yield put(setError(error.message));
    toast.error("Failed to fetch photos");
  }
}

function* fetchLikedPhotosSaga(action) {
  try {
    yield put(setLoading(true));
    const uid = localStorage.getItem('uid');
    const photos = yield call(fetchlikedPhotosFromFirebase, uid);
    yield put(setLikedPhotos(photos));
  } catch (error) {
    yield put(setError(error.message));
    toast.error("Failed to fetch saved looks");
  }
}

function* savePhotoSaga(action) {
  try {
    const { photo } = action.payload;
    const uid = localStorage.getItem('uid');
    const docId = yield call(savePhotoToFirebase, uid, photo);
    
    yield put(addLikedPhoto({ ...photo, docId }));
    toast.success("Look saved to wardrobe!");
  } catch (error) {
    yield put(setError(error.message));
    toast.error("Failed to save look. Please try again.");
  }
}

function* deletePhotoSaga(action) {
  try {
    const { photoId, docId } = action.payload;
    const uid = localStorage.getItem('uid');
    yield call(deletePhotoFromFirebase, uid, docId);
    
    yield put(removeLikedPhoto(photoId));
    toast.success("Look removed from wardrobe!");
  } catch (error) {
    yield put(setError(error.message));
    toast.error("Failed to remove look. Please try again.");
  }
}

export function* photosSaga() {
  yield takeEvery('photos/FETCH_PHOTOS_REQUEST', fetchPhotosSaga);
  yield takeEvery('photos/FETCH_LIKED_PHOTOS_REQUEST', fetchLikedPhotosSaga);
  yield takeEvery('photos/SAVE_PHOTO_REQUEST', savePhotoSaga);
  yield takeEvery('photos/DELETE_PHOTO_REQUEST', deletePhotoSaga);
}
