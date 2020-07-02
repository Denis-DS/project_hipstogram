import { createAsyncAction, createAction } from "typesafe-actions";
import { IAdv } from "./types";

export const addPost = createAsyncAction(
  "addPost/ADD_POST_REQUEST",
  "addPost/ADD_POST_SUCCESS",
  "addPost/ADD_POST_FAILURE"
)<IAdv, void, void>();

export const checkUserData = createAction("addPost/CHECK_USER_DATA")();
