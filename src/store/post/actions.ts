import { createAsyncAction, createAction } from "typesafe-actions";
import { IPostcardData } from "./types";

export const getPostCard = createAsyncAction(
  "post/GET_POST_CARD_REQUEST",
  "post/GET_POST_CARD_SUCCESS",
  "post/GET_POST_CARD_FAILURE"
)<string, IPostcardData, boolean>();

export const deletePostCard = createAction("post/DELETE_POST_CARD")();
