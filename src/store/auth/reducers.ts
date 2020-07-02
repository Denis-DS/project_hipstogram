import { getType } from "typesafe-actions";

import * as actions from "./actions";
import { IAuthState, IAuthAction } from "./types";

const initialState: IAuthState = {
  authData: {
    authToken: "",
    error: "",
    id: "",
    login: "",
  },
};

export default (
  state: IAuthState = initialState,
  action: IAuthAction
): IAuthState => {
  switch (action.type) {
    case getType(actions.authUser.success):
      return {
        ...state,
        authData: {
          ...state.authData,
          authToken: action.payload.authToken,
          id: action.payload.id,
          login: action.payload.login,
        },
      };
    case getType(actions.authUser.failure):
      return {
        ...state,
        authData: {
          authToken: null,
          error: action.payload,
          id: null,
          login: null,
        },
      };
    case getType(actions.unAuthUser):
      localStorage.removeItem("authToken");
      return {
        ...state,
        authData: {
          authToken: null,
          error: null,
          id: null,
          login: null,
        },
      };
    case getType(actions.deleteError):
      return {
        ...state,
        authData: {
          ...state.authData,
          error: null,
        },
      };
    default:
      return state;
  }
};
