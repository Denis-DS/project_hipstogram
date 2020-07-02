import { TGetCommentQuery } from "./../posts/types";
import { take, select, call, put } from "redux-saga/effects";
import * as actions from "./actions";
import { handlerComentsData } from "../../services/helpers";
import { queryComments, mutationComments } from "../../services/api";

export function* getCommentsSaga() {
  while (true) {
    const {
      payload: { idPost },
    } = yield take(actions.getComments.request);
    const jwtToken = yield select((state) => state.auth.authData.authToken);
    try {
      const query: TGetCommentQuery = [
        { "post._id": idPost, answerTo: null },
        { sort: [{ _id: 1 }] },
      ];
      const result = yield call(queryComments, jwtToken, query);
      const commentsData = handlerComentsData(result);
      yield put(actions.getComments.success(commentsData));
    } catch (e) {
      console.error(e);
    }
  }
}

export function* setCommentSaga() {
  while (true) {
    const {
      payload: { answerTo, text },
    } = yield take(actions.setComment.request);
    const jwtToken = yield select((state) => state.auth.authData.authToken);
    const postId = yield select((state) => state.postCard.postCardData._id);
    try {
      yield call(mutationComments, jwtToken, text, postId, answerTo);
      yield put(actions.getComments.request({ idPost: postId }));
    } catch (e) {
      console.error(e);
    }
  }
}
