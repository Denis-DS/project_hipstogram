import { take, put, call, select } from "redux-saga/effects";
import * as actions from "./actions";
import { handlerPostCardData } from "../../services/helpers";
import { queryPostData } from "../../services/api";

export function* getPostCardData() {
  while (true) {
    const { payload } = yield take(actions.getPostCard.request);
    const jwtToken = yield select((state) => state.auth.authData.authToken);
    try {
      const result = yield call(queryPostData, payload, jwtToken);
      if (result) {
        const advData = handlerPostCardData(result);
        yield put(actions.getPostCard.success(advData));
      } else {
        yield put(actions.getPostCard.failure(false));
      }
    } catch (e) {
      console.error(e);
      yield put(actions.getPostCard.failure(false));
    }
  }
}
