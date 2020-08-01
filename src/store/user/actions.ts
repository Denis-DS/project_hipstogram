import { createAsyncAction } from "typesafe-actions";
import { IUserData, IGetUserSuggestionsSuccess } from "./types";

export const getUser = createAsyncAction(
  "user/GET_PROFILE_REQUEST",
  "user/GET_PROFILE_SUCCESS",
  "user/GET_PROFILE_FAILURE"
)<void, IUserData, string>();

export const getSuggestions = createAsyncAction(
  "user/GET_USER_SUGGESTIONS_REQUEST",
  "user/GET_USER_SUGGESTIONS_SUCCESS",
  "user/GET_USER_SUGGESTIONS_FAILURE"
)<void, IGetUserSuggestionsSuccess, string>();
