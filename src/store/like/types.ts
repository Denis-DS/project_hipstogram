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
  readonly createdAt: string;
  readonly nick: string;
  readonly text: string;
  readonly avatar: string;
  readonly answers: IGetLikeSuccess[] | null;
}

export interface ILike {
  readonly _id: string;
  readonly createdAt: string;
  readonly nick: string;
  readonly text: string;
  readonly avatar: string;
}

export interface ISetLikePayload {
  answerTo: string | null;
  text: string;
}

export interface ILikeDataPayload {
  _id: string;
  text: string | any;
  createdAt: string;
  owner: ILikeDataOwner;
  answers: ILikeDataPayload[] | null;
}

interface ILikeDataOwner {
  avatar: { url: string | null } | null;
  nick: string | null;
  _id: string | null;
}

interface ILikeDataPost {
  _id: string | null;
}
