import { take, select, call, put } from "redux-saga/effects";
import * as actions from "./actions";
import { handlerLikeData } from "../../services/helpers";
import { queryLike, mutationLike, delLike } from "../../services/api";

export function* getLikeSaga() {
  while (true) {
    const {
      payload: { idPost },
    } = yield take(actions.getLike.request);
    const authToken = yield select((state) => state.auth.authData.authToken);
    const userId = yield select((state) => state.auth.authData.id);
    try {
      const result = yield call(queryLike, authToken, userId, idPost);
      const likeData = handlerLikeData(result);
      yield put(actions.getLike.success(likeData));
    } catch (e) {
      console.error(e);
    }
  }
}

export function* setLikeSaga() {
  while (true) {
    const {
      payload: { user, post },
    } = yield take(actions.setLike.request);
    const authToken = yield select((state) => state.auth.authData.authToken);
    const idPost = yield select((state) => state.postCard.postCardData._id);
    try {
      yield call(mutationLike, authToken, user, post);
      yield put(actions.getLike.request({ idPost: idPost }));
    } catch (e) {
      console.error(e);
    }
  }
}

export function* delLikeSaga() {
  while (true) {
    const {
      payload: { _id },
    } = yield take(actions.delLike.request);
    const authToken = yield select((state) => state.auth.authData.authToken);
    const idPost = yield select((state) => state.postCard.postCardData._id);
    try {
      yield call(delLike, authToken, _id);
      yield put(actions.getLike.request({ idPost: idPost }));
    } catch (e) {
      console.error(e);
    }
  }
}
