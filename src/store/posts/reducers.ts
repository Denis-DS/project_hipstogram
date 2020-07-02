import { getType } from "typesafe-actions";
import * as actions from "./actions";
import { IPostsAction, IState } from "./types";

const initialState: IState = {
  postsData: [],
  pagesCount: 1,
  postsLimit: 12,
  sortType: "dateDesc",
  isFetching: false,
};

export default (state: IState = initialState, action: IPostsAction): IState => {
  switch (action.type) {
    case getType(actions.getPosts.success):
      return {
        ...state,
        postsData: [...action.payload.postsData],
        pagesCount: action.payload.pagesCount,
      };
    case getType(actions.setPostsLimit):
      return { ...state, postsLimit: action.payload };
    case getType(actions.setPostsSort):
      return { ...state, sortType: action.payload };
    case getType(actions.togglePreloader):
      return { ...state, isFetching: !state.isFetching };
    default:
      return state;
  }
};
