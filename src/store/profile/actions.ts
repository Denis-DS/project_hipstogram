import { createAsyncAction, createAction } from "typesafe-actions";
import {
  IProfileData,
  ISetProfileData,
  IAvatar,
  IGetProfileRequest,
} from "./types";

export const getProfile = createAsyncAction(
  "profile/GET_PROFILE_REQUEST",
  "profile/GET_PROFILE_SUCCESS",
  "profile/GET_PROFILE_FAILURE"
)<IGetProfileRequest | void, IProfileData, string>();

export const deleteSuccess = createAction("profile/DELETE_SUCCESS")();

export const setProfile = createAsyncAction(
  "profile/SET_PROFILE_REQUEST",
  "profile/SET_PROFILE_SUCCESS",
  "profile/SET_PROFILE_FAILURE"
)<ISetProfileData, string, string>();

export const setAvatar = createAsyncAction(
  "profile/SET_AVATAR_REQUEST",
  "profile/SET_AVATAR_SUCCESS",
  "profile/SET_AVATAR_FAILURE"
)<FormData, IAvatar, string>();
