import { combineReducers } from "redux";
import { StateType, EmptyAction } from "typesafe-actions";
import { connectRouter } from "connected-react-router";

import history from "../history";
import authReducer from "./auth/reducers";
import { AuthAction } from "./auth/types";
import { IProfileAction } from "./profile/types";
import profileReducer from "./profile/reducers";
import { IPostsAction } from "./posts/types";
import postsReducer from "./posts/reducers";
import { IPostCardAction } from "./post/types";
import postCardReducer from "./post/reducers";
import { AddAdvAction } from "./addPost/types";
import messageReducer from "./message/reducers";
import { TMessageAction } from "./message/types";
import commentsReducer from "./comments/reducers";
import { TCommentsAction } from "./comments/types";
import likeReducer from "./like/reducers";
import { TLikeAction } from "./like/types";
import userReducer from "./user/reducers";
import { IUserAction } from "./user/types";

const rootReducer = combineReducers({
  router: connectRouter(history),
  auth: authReducer,
  profile: profileReducer,
  posts: postsReducer,
  postCard: postCardReducer,
  message: messageReducer,
  comments: commentsReducer,
  like: likeReducer,
  user: userReducer,
});

export type IRootState = StateType<typeof rootReducer>;
export type IRootAction =
  | AuthAction
  | EmptyAction<string>
  | IProfileAction
  | IPostsAction
  | IPostCardAction
  | AddAdvAction
  | TMessageAction
  | TCommentsAction
  | TLikeAction
  | IUserAction;

export default rootReducer;
