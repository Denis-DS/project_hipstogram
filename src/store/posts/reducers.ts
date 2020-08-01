import { getType } from "typesafe-actions";
import * as actions from "./actions";
import { IPostsAction, IState } from "./types";

const initialState: IState = {
  postsFollowingData: [],
  postsData: [],
  postsCount: 0,
  pagesCount: 1,
  postsLimit: 21,
  sortType: "dateDesc",
  isFetching: false,
  page: 1,
  postsFollowingCount: 0,
};

export default (state: IState = initialState, action: IPostsAction): IState => {
  switch (action.type) {
    case getType(actions.getPosts.success):
      return {
        ...state,
        postsData: [...action.payload.postsData],
        pagesCount: action.payload.pagesCount,
      };
    case getType(actions.getFollowingPosts.success):
      return {
        ...state,
        postsFollowingData: [...action.payload.postsFollowingData],
        pagesCount: action.payload.pagesCount,
      };
    case getType(actions.getCount.success):
      return {
        ...state,
        postsCount: action.payload,
      };
    case getType(actions.getFollowingCount.success):
      return {
        ...state,
        postsFollowingCount: action.payload,
      };
    case getType(actions.setPostsLimit):
      return { ...state, postsLimit: action.payload };
    case getType(actions.setPostsSort):
      return { ...state, sortType: action.payload };
    case getType(actions.togglePreloader):
      return { ...state, isFetching: !state.isFetching };
    case getType(actions.setPageIncrement):
      return { ...state, page: state.page + 1 };
    case getType(actions.setPageDecrement):
      return { ...state, page: 1 };
    default:
      return state;
  }
};
