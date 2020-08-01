import { createAsyncAction } from "typesafe-actions";
import {
  IGetLikeRequest,
  IGetLikeSuccess,
  ISetLikePayload,
  IDelLikePayload,
} from "./types";

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

export const delLike = createAsyncAction(
  "like/SET_DEL_REQUEST",
  "like/SET_DEL_SUCCESS",
  "like/SET_DEL_FAILURE"
)<IDelLikePayload, string, void>();
