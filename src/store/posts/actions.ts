import { createAsyncAction, createAction } from "typesafe-actions";
import {
  IGetPostsSuccess,
  IPostsPayload,
  IFollowingPostsPayload,
  IGetFollowingPostsSuccess,
} from "./types";

export const getPosts = createAsyncAction(
  "posts/GET_POSTS_REQUEST",
  "posts/GET_POSTS_SUCCESS",
  "posts/GET_POSTS_FAILURE"
)<IPostsPayload, IGetPostsSuccess, string>();

export const getFollowingPosts = createAsyncAction(
  "posts/GET_POSTS_FOLLOWING_REQUEST",
  "posts/GET_POSTS_FOLLOWING_SUCCESS",
  "posts/GET_POSTS_FOLLOWING_FAILURE"
)<IFollowingPostsPayload, IGetFollowingPostsSuccess, string>();

export const getCount = createAsyncAction(
  "posts/GET_POSTS_COUNT_REQUEST",
  "posts/GET_POSTS_COUNT_SUCCESS",
  "posts/GET_POSTS_COUNT_FAILURE"
)<void, number, string>();

export const getFollowingCount = createAsyncAction(
  "posts/GET_POSTS_FOLLOWING_COUNT_REQUEST",
  "posts/GET_POSTS_FOLLOWING_COUNT_SUCCESS",
  "posts/GET_POSTS_FOLLOWING_COUNT_FAILURE"
)<void, number, string>();

export const setPostsLimit = createAction("posts/SET_POSTS_LIMIT")<number>();

export const setPostsSort = createAction("posts/SET_POSTS_SORT")<string>();

export const togglePreloader = createAction("posts/TOGGLE_PRELOADER")();

export const setPageIncrement = createAction(
  "posts/SET_POSTS_PAGE_INCREMENT"
)();
export const setPageDecrement = createAction(
  "posts/SET_POSTS_PAGE_DECREMENT"
)();
