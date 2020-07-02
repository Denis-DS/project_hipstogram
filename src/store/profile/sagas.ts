import { take, call, put, select } from "redux-saga/effects";
import * as actions from "./actions";
import {
  upLoadPhoto,
  queryUserData,
  mutationUserData,
  addAvatarToUser,
} from "../../services/api";

export function* getUserData() {
  while (true) {
    const {
      payload: { idUser },
    } = yield take(actions.getProfile.request);
    const authToken = yield select((state) => state.auth.authData.authToken);
    const userId = yield select((state) => state.auth.authData.id);

    try {
      const userData = yield call(
        queryUserData,
        idUser ? idUser : userId,
        authToken
      );
      yield put(actions.getProfile.success(userData));
    } catch (error) {
      console.error(error);
      yield put(actions.getProfile.failure("Server is not available"));
    }
  }
}

export function* setUserData() {
  while (true) {
    const {
      payload: { login, nick },
    } = yield take(actions.setProfile.request);
    const authToken = yield select((state) => state.auth.authData.authToken);
    const userId = yield select((state) => state.auth.authData.id);
    try {
      const result = yield call(
        mutationUserData,
        userId,
        authToken,
        login,
        nick
      );
      if (result) {
        yield put(actions.setProfile.success("Data changed successfully"));
        const userData = yield call(queryUserData, userId, authToken);
        yield put(actions.getProfile.success(userData));
      }
    } catch (error) {
      console.error(error);
    }
  }
}

export function* setAvatar() {
  while (true) {
    const { payload } = yield take(actions.setAvatar.request);
    const authToken = yield select((state) => state.auth.authData.authToken);
    const userId = yield select((state) => state.auth.authData.id);
    try {
      const imgData = yield call(upLoadPhoto, authToken, payload);
      const result = yield call(addAvatarToUser, authToken, userId, imgData);
      yield put(actions.setAvatar.success(result));
    } catch (error) {
      console.error(error);
    }
  }
}
