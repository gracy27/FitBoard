import { put, takeEvery, call } from 'redux-saga/effects';
import { setUser, setLoading, setError, clearUser } from '../slices/userSlice';
import { login } from '../../utils/Login';
import { logout } from '../../utils/Logout';
import { toast } from 'react-toastify';

function* loginSaga(action) {
  try {
    yield put(setLoading(true));
    const { email, password } = action.payload;
    yield call(login, email, password);
    
    const idToken = localStorage.getItem('idtoken');
    const userEmail = localStorage.getItem('userEmail');
    const userName = localStorage.getItem('userName');
    const uid = localStorage.getItem('uid');
    
    if (idToken) {
      yield put(setUser({
        email: userEmail,
        name: userName,
        uid: uid,
        idToken: idToken,
      }));
      toast.success("Logged In successfully!");
    } else {
      throw new Error("Login failed. No token received.");
    }
  } catch (error) {
    yield put(setError(error.message));
    toast.error("Login failed. Please check your credentials and try again.");
  }
}

function* logoutSaga(action) {
  try {
    yield put(setLoading(true));
    yield call(logout);
    yield put(clearUser());
    toast.success("Logged out successfully!");
  } catch (error) {
    yield put(setError(error.message));
    toast.error("Logout failed.");
  }
}

export function* userSaga() {
  yield takeEvery('user/LOGIN_REQUEST', loginSaga);
  yield takeEvery('user/LOGOUT_REQUEST', logoutSaga);
}
