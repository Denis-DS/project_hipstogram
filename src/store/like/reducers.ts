import { getType } from "typesafe-actions";
import * as actions from "./actions";
import { TLikeAction, ILikeState } from "./types";

const initialState: ILikeState = {
  likeData: [],
};

export default (
  state: ILikeState = initialState,
  action: TLikeAction
): ILikeState => {
  switch (action.type) {
    case getType(actions.getLike.success):
      return { ...state, likeData: action.payload };
    default:
      return state;
  }
};
