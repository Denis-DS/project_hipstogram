import * as actions from "./actions";
import { ActionType } from "typesafe-actions";

export type IPostsAction = ActionType<typeof actions>;

export interface IPosts {
  readonly _id: string;
  readonly title: string;
  readonly images: string;
  readonly createdAt: string;
  readonly comments: string | number;
  readonly likes: number;
}

export interface IState {
  readonly postsData: IPosts[];
  readonly postsCount: number;
  readonly postsFollowingCount: number;
  readonly pagesCount: number;
  readonly postsLimit: number;
  readonly sortType: string;
  readonly isFetching: boolean;
  readonly page: number;
  readonly postsFollowingData: IPosts[];
}

export interface IPostsPayload {
  type: string;
  quest: string | null;
  idUser: string | null;
}

export interface IGetPostsSuccess {
  readonly postsData: IPosts[];
  readonly pagesCount: number;
}

export interface IFollowingPostsPayload {
  type: string;
  quest: string | null;
  idUser: string | null;
}

export interface IGetFollowingPostsSuccess {
  readonly postsFollowingData: IPosts[];
  readonly pagesCount: number;
}

export interface ISortArr {
  id: number;
  text: string;
  value: string;
}

export interface ISortPosts {
  _id?: number;
  price?: number;
}

export type TPostsData = Array<IFilterPosts | ISortPos>;

export interface IFilterPosts {
  ___owner?: string;
  $or?: Array<ITitle | IDescription>;
}

interface ITitle {
  title: string;
}

interface IDescription {
  description: string;
}

interface ISortPos {
  limit: Array<number>;
  skip: Array<number>;
  sort: ISortPosts[];
}

export type TGetCommentQuery = Array<IFilterComments | ISortPosComments>;

export type TGetLikeQuery = Array<IFilterLike | ISortPosComments>;

interface IFilterComments {
  "post._id": number;
  answerTo: null;
}

interface IFilterLike {
  "post._id": number;
  "user._id": number;
}

interface ISortPosComments {
  sort: IId[];
}

interface IId {
  _id: number;
}

export interface IPostsDataPayload {
  _id: string;
  title: string | null;
  createdAt: string;
  images: IImages[] | null;
  likes: ILikes[];
  comments: IComments[] | null;
}

export interface IComments {
  _id: string;
}

export interface IImages {
  url: string | null;
  _id: string;
}

export interface ILikes {
  _id: string;
}

export interface IGallery {
  postsData: IPosts[];
  isMyPosts: boolean;
  onScroll: Function;
  postFollowing: boolean;
}
