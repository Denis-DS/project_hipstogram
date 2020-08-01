import { all, spawn } from "redux-saga/effects";
import { authUserSaga, regUserSaga } from "./auth/sagas";
import {
  getUserData,
  setUserData,
  setAvatar,
  setFollowUser,
} from "./profile/sagas";
import { getUser, getUserSuggestions } from "./user/sagas";
import { getPostsData, getFollowingPostsData } from "./posts/sagas";
import { getPostCardData } from "./post/sagas";
import { setPostSaga } from "./addPost/sagas";
import { setMessageSaga, getMessageSaga } from "./message/sagas";
import { getCommentsSaga, setCommentSaga } from "./comments/sagas";
import { getLikeSaga, setLikeSaga } from "./like/sagas";

export default function* rootSaga() {
  yield all([
    spawn(authUserSaga),
    spawn(regUserSaga),
    spawn(getUserData),
    spawn(setUserData),
    spawn(setFollowUser),
    spawn(setAvatar),
    spawn(getPostsData),
    spawn(getFollowingPostsData),
    spawn(getPostCardData),
    spawn(setPostSaga),
    spawn(setMessageSaga),
    spawn(getMessageSaga),
    spawn(getCommentsSaga),
    spawn(setCommentSaga),
    spawn(getLikeSaga),
    spawn(setLikeSaga),
    spawn(getUser),
    spawn(getUserSuggestions),
  ]);
}
