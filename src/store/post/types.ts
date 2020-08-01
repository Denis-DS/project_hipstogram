import * as actions from "./actions";
import { ActionType } from "typesafe-actions";

export type IPostCardAction = ActionType<typeof actions>;

export interface IImages {
  url: string;
  _id: string;
}

export interface IPostState {
  postCardData: IPostcardData;
  isPost: boolean;
}

export interface IPostcardData {
  readonly _id: string;
  readonly userId: string;
  readonly postDate: string;
  readonly title: string;
  readonly userDate: string;
  readonly nick: string;
  readonly avatar: string;
  readonly images: IImages[];
  readonly likesCount: number;
  readonly likes: IPostCardLikes[] | null;
  readonly login: string;
  readonly comments: IComments[];
}

export interface IPostCardPayload {
  createdAt: string;
  title: string | null;
  _id: string;
  owner: IPostCardOwner;
  images: IImages[] | null;
  likesCount: number;
  likes: IPostCardLikes[];
  comments: IComments[];
}

export interface IComments {
  _id: string;
}

export interface IPostCardLikes {
  _id: string;
  owner: { _id: string };
}

interface IPostCardOwner {
  createdAt: string;
  nick: string | null;
  _id: string;
  login: string;
  avatar: { url: string | null };
}
