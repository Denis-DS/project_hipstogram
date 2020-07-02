import { TGetLikeQuery } from "../posts/types";
import { take, select, call, put } from "redux-saga/effects";
import * as actions from "./actions";
import { handlerLikeData } from "../../services/helpers";
import { queryLike, mutationLike } from "../../services/api";

export function* getLikeSaga() {
  while (true) {
    const {
      payload: { idPost },
    } = yield take(actions.getLike.request);
    const authToken = yield select((state) => state.auth.authData.authToken);
    const userId = yield select((state) => state.auth.authData.id);
    try {
      console.log(idPost);
      const query: TGetLikeQuery = [
        {
          "owner._id": idPost ? null : userId,
          answerTo: null,
          "post._id": idPost,
        },
        { sort: [{ _id: 1 }] },
      ];
      const result = yield call(queryLike, authToken, query);
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
      payload: { user, _id },
    } = yield take(actions.setLike.request);
    const authToken = yield select((state) => state.auth.authData.authToken);
    const idPost = yield select((state) => state.advCard.advCardData._id);
    try {
      yield call(mutationLike, authToken, idPost, _id, user);
      yield put(actions.getLike.request({ idPost: idPost }));
    } catch (e) {
      console.error(e);
    }
  }
}
