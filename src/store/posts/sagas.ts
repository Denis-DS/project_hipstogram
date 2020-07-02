import { take, put, call, select } from "redux-saga/effects";
import * as actions from "./actions";
import { queryPostsData, queryPostsCount } from "../../services/api";
import {
  getPostCountFilter,
  getPostsDataQuery,
  handlerPostsData,
} from "../../services/helpers";

export function* getPostsData() {
  while (true) {
    const {
      payload: { type, page, quest, idUser },
    } = yield take(actions.getPosts.request);
    const authToken = yield select((state) => state.auth.authData.authToken);
    const userId = yield select((state) => state.auth.authData.id);
    const limit = yield select((state) => state.posts.postsLimit);
    const sortType = yield select((state) => state.posts.sortType);
    yield put(actions.togglePreloader());
    try {
      const filter = getPostCountFilter(type, quest, idUser ? idUser : userId);
      let queryCountAdvs = [filter];
      const postCount = yield call(queryPostsCount, authToken, queryCountAdvs);
      if (postCount > 0) {
        const pagesCount = Math.ceil(postCount / limit);
        let queryPosts = getPostsDataQuery(
          filter,
          postCount,
          page,
          limit,
          sortType
        );
        const result = yield call(queryPostsData, authToken, queryPosts);
        const postsData = handlerPostsData(result);
        yield put(actions.getPosts.success({ postsData, pagesCount }));
      }
    } catch (e) {
      console.error(e);
    }
    yield put(actions.togglePreloader());
  }
}
