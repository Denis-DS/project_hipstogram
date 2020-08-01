import * as actions from "./actions";
import { ActionType } from "typesafe-actions";

export type IProfileAction = ActionType<typeof actions>;

export interface IProfileDataState {
  profileData: IProfileData;
}

export interface IGetProfileRequest {
  idUser: string | null;
}

export interface IProfileData {
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

export interface ISetProfileData {
  readonly login: string;
  readonly nick: string;
}

export interface ISetFollowing {
  readonly followingID: string;
}
