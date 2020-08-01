import { getType } from "typesafe-actions";
import * as actions from "./actions";
import { IMessageState, TMessageAction } from "./types";

const initialState: IMessageState = {
  success: "",
  failure: "",
  messagesData: [],
  pagesCount: 1,
  limit: 5,
};

export default (
  state: IMessageState = initialState,
  action: TMessageAction
): IMessageState => {
  switch (action.type) {
    case getType(actions.setMessage.success):
      return { ...state, success: action.payload };
    case getType(actions.setMessage.failure):
      return { ...state, failure: action.payload };
    case getType(actions.deleteToastMessage):
      return { ...state, success: "", failure: "" };
    case getType(actions.getMessages.success):
      return {
        ...state,
        messagesData: [...action.payload.messagesData],
        pagesCount: action.payload.pagesCount,
      };
    default:
      return state;
  }
};
