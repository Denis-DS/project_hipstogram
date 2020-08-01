import * as actions from "./actions";
import { ActionType } from "typesafe-actions";

export type TCommentsAction = ActionType<typeof actions>;

export interface IGetCommentsRequest {
  idPost: string;
}
export interface ICommentsState {
  readonly commentsData: IGetCommentsSuccess[];
}

export interface IGetCommentsSuccess {
  readonly _id: string;
  readonly createdAt: string;
  readonly nick: string;
  readonly text: string;
  readonly avatar: string;
  readonly answers: IGetCommentsSuccess[] | null;
  readonly userId: string;
}

export interface IComment {
  readonly _id: string;
  readonly createdAt: string;
  readonly nick: string;
  readonly text: string;
  readonly userId: string;
  readonly avatar: string;
}

export interface ISetCommentPayload {
  answerTo: string | null;
  text: string;
}

export interface ICommentsDataPayload {
  _id: string;
  text: string | any;
  createdAt: string;
  owner: ICommentsDataOwner;
  answers: ICommentsDataPayload[] | null;
}

interface ICommentsDataOwner {
  avatar: { url: string | null } | null;
  nick: string | null;
  _id: string;
}
