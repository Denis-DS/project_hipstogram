import { take, put, call, select } from "redux-saga/effects";
import * as actions from "./actions";
import {
  queryPostsData,
  queryPostsCount,
  queryFollowingPostsData,
  queryFollowingPostsCount,
} from "../../services/api";
import {
  getPostCountFilter,
  getPostsDataQuery,
  handlerPostsData,
} from "../../services/helpers";

export function* getPostsData() {
  while (true) {
    const {
      payload: { type, quest, idUser },
    } = yield take(actions.getPosts.request);
    const authToken = yield select((state) => state.auth.authData.authToken);
    const userId = yield select((state) => state.auth.authData.id);
    const limit = yield select((state) => state.posts.postsLimit);
    const sortType = yield select((state) => state.posts.sortType);
    const page = yield select((state) => state.posts.page);
    yield put(actions.togglePreloader());
    try {
      const filter = getPostCountFilter(type, quest, idUser ? idUser : userId);
      let queryCountPosts = [filter];
      const postCount = yield call(queryPostsCount, authToken, queryCountPosts);
      yield put(actions.getCount.success(postCount));
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

export function* getFollowingPostsData() {
  while (true) {
    const {
      payload: { type, quest, idUser },
    } = yield take(actions.getFollowingPosts.request);
    const authToken = yield select((state) => state.auth.authData.authToken);
    const userId = yield select((state) => state.auth.authData.id);
    const limit = yield select((state) => state.posts.postsLimit);
    const sortType = yield select((state) => state.posts.sortType);
    const page = yield select((state) => state.posts.page);
    yield put(actions.togglePreloader());
    try {
      const filter = getPostCountFilter(type, quest, idUser ? idUser : userId);
      let queryCountPosts = [filter];
      const postCount = yield call(queryPostsCount, authToken, queryCountPosts);
      const postFollowingCount = yield call(
        queryFollowingPostsCount,
        authToken,
        userId
      );
      yield put(actions.getCount.success(postCount));
      yield put(actions.getFollowingCount.success(postFollowingCount));
      if (postCount > 0) {
        const pagesCount = Math.ceil(postCount / limit);
        let queryPosts = getPostsDataQuery(
          filter,
          postCount,
          page,
          limit,
          sortType
        );
        const result = yield call(
          queryFollowingPostsData,
          authToken,
          queryPosts,
          userId
        );
        const postsFollowingData = result;
        yield put(
          actions.getFollowingPosts.success({ postsFollowingData, pagesCount })
        );
      }
    } catch (e) {
      console.error(e);
    }
    yield put(actions.togglePreloader());
  }
}
