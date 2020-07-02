import { createAsyncAction, createAction } from "typesafe-actions";
import { IGetPostsSuccess, IPostsPayload } from "./types";

export const getPosts = createAsyncAction(
  "posts/GET_POSTS_REQUEST",
  "posts/GET_POSTS_SUCCESS",
  "posts/GET_POSTS_FAILURE"
)<IPostsPayload, IGetPostsSuccess, string>();

export const setPostsLimit = createAction("posts/SET_POSTS_LIMIT")<number>();

export const setPostsSort = createAction("posts/SET_POSTS_SORT")<string>();

export const togglePreloader = createAction("posts/TOGGLE_PRELOADER")();
