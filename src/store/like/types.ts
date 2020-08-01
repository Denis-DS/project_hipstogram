import * as actions from "./actions";
import { ActionType } from "typesafe-actions";

export type TLikeAction = ActionType<typeof actions>;

export interface IGetLikeRequest {
  idPost: string;
}
export interface ILikeState {
  readonly likeData: IGetLikeSuccess[];
}

export interface IGetLikeSuccess {
  readonly _id: string;
  readonly idPost: string;
  readonly images: string | null;
  readonly login: string;
  readonly avatar: string;
  readonly idLike: string;
}

export interface ILike {
  readonly _id: string;
  readonly login: string;
  readonly avatar: string;
  readonly idPost: string;
  readonly images: string;
}

export interface ISetLikePayload {
  user: string | null;
  post: string | null;
}

export interface IDelLikePayload {
  _id: string | null;
}

interface ILikeDataPost {
  images: IImages[];
  _id: string;
}

export interface ILikeDataPayload {
  _id: string;
  owner: ILikeDataOwner;
  post: ILikeDataPost;
}

interface IImages {
  url: string | null;
}

interface ILikeDataOwner {
  avatar: { url: string | null } | null;
  login: string | null;
  _id: string;
}
