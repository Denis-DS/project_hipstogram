import { createAsyncAction, createAction } from "typesafe-actions";
import { AuthCreds, IJwtData } from "./types";

export const authUser = createAsyncAction(
  "auth/AUTH_USER_REQUEST",
  "auth/AUTH_USER_SUCCESS",
  "auth/AUTH_USER_FAILURE"
)<AuthCreds, IJwtData, string>();

export const unAuthUser = createAction("auth/UN_AUTH_USER")();

export const deleteError = createAction("auth/DELETE_ERROR")();

export const regUser = createAsyncAction(
  "auth/REG_USER_SUCCESS",
  "auth/REG_USER_FAILURE",
  "auth/REG_USER_REQUEST"
)<AuthCreds, string, string>();
