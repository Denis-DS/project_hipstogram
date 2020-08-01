import * as actions from "./actions";
import { ActionType } from "typesafe-actions";

export type IUserAction = ActionType<typeof actions>;

export interface IUserDataState {
  readonly profileData: IUserData;
  readonly userDataSuggestions: IUserSuggestions[];
}

export interface IGetUserSuggestionsSuccess {
  readonly userDataSuggestions: IUserSuggestions[];
}

export interface IUserData {
  readonly _id: string;
  readonly login: string;
  readonly nick: string | null;
  readonly avatar: IAvatar | null;
  readonly followers: IFollow[] | null;
  readonly following: IFollow[] | null;
  readonly error: string;
  readonly success: string;
}

export interface IAvatar {
  readonly _id: string;
  readonly url: string;
}

export interface IFollow {
  readonly _id: string;
  readonly login: string;
  readonly avatar: IAvatar | null;
}

export interface IUserSuggestionsData {
  userDataSuggestions: IUserSuggestions[];
}

export interface IUserSuggestions {
  readonly _id: string;
  readonly login: string;
  readonly avatar: string;
}

export interface IUserSuggestionsPayload {
  readonly _id: string;
  readonly login: string;
  readonly avatar: IAvatar | null;
}
