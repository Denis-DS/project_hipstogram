import { createAsyncAction } from "typesafe-actions";
import { IGetLikeRequest, IGetLikeSuccess, ISetLikePayload } from "./types";

export const getLike = createAsyncAction(
  "like/GET_LIKE_REQUEST",
  "like/GET_LIKE_SUCCESS",
  "like/GET_LIKE_FAILURE"
)<IGetLikeRequest, IGetLikeSuccess[], void>();

export const setLike = createAsyncAction(
  "like/SET_LIKE_REQUEST",
  "like/SET_LIKE_SUCCESS",
  "like/SET_LIKE_FAILURE"
)<ISetLikePayload, string, void>();
