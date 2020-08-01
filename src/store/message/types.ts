import { RefObject } from "react";
import { ActionType } from "typesafe-actions";
import * as actions from "./actions";

export type TMessageAction = ActionType<typeof actions>;

export interface IMessagePayload {
  userId: string;
  text: string;
  refPhoto: RefObject<HTMLFormElement> | undefined | null;
}

export interface IMessageState {
  readonly success: string;
  readonly failure: string;
  readonly messagesData: IMessageData[];
  readonly pagesCount: number;
  readonly limit: number;
}

export interface IMessageData {
  readonly _id: string;
  readonly createdAt: string;
  readonly text: string;
  readonly image: string | null;
  readonly login: string;
  readonly avatar: string;
}

export interface IPageData {
  readonly messagesData: IMessageData[];
  readonly pagesCount: number;
}

export interface IPageNumber {
  page: number;
}

export type TQueryMessage = Array<IMessageFilter | IMessageSortPos>;

export interface IMessageFilter {
  "to._id": number;
}

interface IMessageSortPos {
  sort: IMessageSort[];
  limit: Array<number>;
  skip: Array<number>;
}

interface IMessageSort {
  _id: number;
}

export interface IMessageDataPayload {
  _id: string;
  text: string | null;
  createdAt: string;
  image: { url: string | null } | null;
  owner: IMessageDataOwner;
}

interface IMessageDataOwner {
  avatar: { url: string | null } | null;
  login: string | null;
}
