import { getType } from "typesafe-actions";

import * as actions from "./actions";
import { IUserDataState, IUserAction } from "./types";

const initialState: IUserDataState = {
  profileData: {
    _id: "",
    login: "",
    nick: "",
    avatar: {
      _id: "",
      url: "",
    },
    followers: [],
    following: [],
    error: "",
    success: "",
  },
  userDataSuggestions: [],
};

export default (state: IUserDataState = initialState, action: IUserAction) => {
  switch (action.type) {
    case getType(actions.getUser.success):
      return {
        ...state,
        profileData: {
          ...state.profileData,
          _id: action.payload._id,
          login: action.payload.login,
          nick: action.payload.nick,
          avatar: action.payload.avatar,
          followers: action.payload.followers,
          following: action.payload.following,
        },
      };
    case getType(actions.getUser.failure):
      return {
        ...state,
        profileData: {
          ...state.profileData,
          error: action.payload,
        },
      };
    case getType(actions.getSuggestions.success):
      return {
        ...state,
        userDataSuggestions: [...action.payload.userDataSuggestions],
      };

    default:
      return state;
  }
};
