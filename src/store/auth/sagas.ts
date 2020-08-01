import { take, call, put } from "redux-saga/effects";
import jwtDecode from "jwt-decode";

import * as actions from "./actions";
import { push } from "connected-react-router";
import { IJWTData } from "./types";
import { getAuthToken, regUserRequest } from "../../services/api";

export function* authUserSaga() {
  if (localStorage.authToken) {
    const jwtData: IJWTData = jwtDecode(localStorage.authToken);
    const authToken = localStorage.authToken;
    const id = jwtData.sub?.id;
    const login = jwtData.sub?.login;
    yield put(actions.authUser.success({ authToken, id, login }));
  }
  while (true) {
    const {
      payload: { login, password },
    } = yield take(actions.authUser.request);

    try {
      const authToken = yield call(getAuthToken, login, password);

      if (authToken) {
        const jwtData = yield jwtDecode(authToken);
        const id = jwtData.sub.id;
        const login = jwtData.sub.login;
        yield put(actions.authUser.success({ authToken, id, login }));
        localStorage.setItem("authToken", authToken);
      } else {
        yield put(actions.authUser.failure("Wrong login or password"));
      }
    } catch (error) {
      console.error("error saga: ", error);
      yield put(actions.authUser.failure("Server error"));
    }
  }
}

export function* regUserSaga() {
  while (true) {
    const { payload } = yield take(actions.regUser.request);
    try {
      const result = yield call(
        regUserRequest,
        payload.login,
        payload.password
      );
      if (result) {
        yield put(push("/regsuccess"));
      } else {
        yield put(actions.authUser.failure("This user already exists"));
      }
    } catch (error) {
      console.error(error);
      yield put(actions.authUser.failure("Server error"));
    }
  }
}
