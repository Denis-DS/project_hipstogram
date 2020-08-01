import * as actions from "./actions";
import { getType } from "typesafe-actions";
import { IPostState, IPostCardAction } from "./types";

const initialState: IPostState = {
  postCardData: {
    _id: "",
    userId: "",
    postDate: "",
    title: "",
    userDate: "",
    nick: "",
    avatar: "",
    images: [{ url: "", _id: "" }],
    likesCount: 0,
    likes: [{ _id: "", owner: { _id: "" } }],
    login: "",
    comments: [],
  },
  isPost: true,
};

export default (
  state: IPostState = initialState,
  action: IPostCardAction
): IPostState => {
  switch (action.type) {
    case getType(actions.getPostCard.success):
      return {
        ...state,
        postCardData: {
          ...state.postCardData,
          ...action.payload,
        },
      };
    case getType(actions.getPostCard.failure):
      return { ...state, isPost: false };
    case getType(actions.deletePostCard):
      return {
        ...state,
        postCardData: {
          ...state.postCardData,
          ...initialState.postCardData,
        },
        isPost: true,
      };
    default:
      return state;
  }
};
