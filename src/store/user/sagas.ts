import { take, call, put, select } from "redux-saga/effects";
import * as actions from "./actions";
import { queryUserData, queryUserSuggestions } from "../../services/api";
import { handlerUserSuggestions } from "../../services/helpers";

export function* getUser() {
  while (true) {
    yield take(actions.getUser.request);
    const authToken = yield select((state) => state.auth.authData.authToken);
    const userId = yield select((state) => state.auth.authData.id);

    try {
      const userData = yield call(queryUserData, userId, authToken);
      yield put(actions.getUser.success(userData));
    } catch (error) {
      console.error(error);
      yield put(actions.getUser.failure("Server is not available"));
    }
  }
}

export function* getUserSuggestions() {
  while (true) {
    yield take(actions.getSuggestions.request);
    const authToken = yield select((state) => state.auth.authData.authToken);
    try {
      const result = yield call(queryUserSuggestions, authToken);

      const userDataSuggestions = yield call(handlerUserSuggestions, result);
      yield put(actions.getSuggestions.success({ userDataSuggestions }));
    } catch (error) {
      console.error(error);
      yield put(actions.getSuggestions.failure("Server is not available"));
    }
  }
}
