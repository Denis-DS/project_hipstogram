import { push } from "connected-react-router";
import { select, take, call, put } from "redux-saga/effects";
import * as actions from "./actions";
import { addPost } from "../../services/api";
import { handlerPostImg } from "../../services/helpers";

export function* setPostSaga() {
  while (true) {
    const {
      payload: { title, oldImages, refPhotos, _id },
    } = yield take(actions.addPost.request);
    const jwtToken = yield select((state) => state.auth.authData.authToken);
    try {
      const idPhotos = yield call(
        handlerPostImg,
        oldImages,
        refPhotos,
        jwtToken
      );
      console.log(idPhotos);
      const result = yield call(addPost, jwtToken, title, idPhotos, _id);
      if (result) yield put(push("/postsaccess"));
    } catch (e) {
      console.error(e);
    }
  }
}
