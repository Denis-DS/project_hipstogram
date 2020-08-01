import React, { useEffect, useState } from "react";
import classnames from "classnames";
import { bindActionCreators, Dispatch } from "redux";
import { IRootAction, IRootState } from "../../../store/rootReducer";
import * as profileActions from "../../../store/profile/actions";
import * as actions from "../../../store/posts/actions";
import style from "./style.module.scss";
import { connect } from "react-redux";
import Avatar from "../Avatar";
import { Link, RouteComponentProps } from "react-router-dom";
import Gallery from "../../posts/Gallery";
import Following from "../Follow";
import Message from "../../AddMessage";

const mapDispatchToProps = (dispatch: Dispatch<IRootAction>) =>
  bindActionCreators(
    {
      getPosts: actions.getPosts.request,
      getProfile: profileActions.getProfile.request,
      setPageIncrement: actions.setPageIncrement,
      setPageDecrement: actions.setPageDecrement,
    },
    dispatch
  );

const mapStateToProps = (state: IRootState) => ({
  login: state.profile.profileData.login,
  nick: state.profile.profileData.nick,
  followers: state.profile.profileData.followers,
  following: state.profile.profileData.following,
  postsData: state.posts.postsData,
  postsCount: state.posts.postsCount,
  _id: state.auth.authData.id,
  isFetching: state.posts.isFetching,
});

type TParams = { id: string; q: string };

type IProps = ReturnType<typeof mapDispatchToProps> &
  ReturnType<typeof mapStateToProps> &
  RouteComponentProps<TParams>;

const Profile: React.FC<IProps> = ({
  getPosts,
  getProfile,
  setPageIncrement,
  setPageDecrement,
  login,
  nick,
  followers,
  following,
  postsData,
  postsCount,
  _id,
  isFetching,
  match,
}: IProps) => {
  const quest = match.params.q || null;
  const idUser = match.params.id;
  const type = "myposts";
  const [arr, setArr] = useState(postsData);

  const potsStore = () => {
    if (postsData.length !== 0 && arr.length < postsCount) {
      setArr(arr.concat(postsData));
    }
  };

  const hendleScroll = () => {
    if (postsData != null || arr.length < postsCount) {
      setPageIncrement();
      getPosts({ type, quest, idUser });
    }
  };

  useEffect(() => {
    !postsData.some((n) => arr.includes(n)) && potsStore();
  }, [postsData]);

  useEffect(() => {
    setArr([]);
    setPageDecrement();
    getProfile({ idUser: match.params.id });
    getPosts({ type, quest, idUser });
  }, [match.params.id]);

  return (
    <div className={classnames("row", style.wrapper)}>
      <div>
        <div className={style.Flex}>
          <div>
            <Avatar />
          </div>
          <Message nick={login} userId={idUser} />
          <div className={style.Info}>
            <div className={style.UserFollow}>
              <div>
                <h1>{login}</h1>
                <h5>{nick}</h5>
              </div>
              {_id === match.params.id ? null : (
                <>
                  <a
                    className={classnames("modal-trigger", style.messageBtn)}
                    href="#modal1"
                  >
                    <i className="material-icons right">send</i>
                  </a>
                  <Following followingID={match.params.id} />
                </>
              )}
            </div>
            <div className={style.UserInfo}>
              <div>
                {idUser === _id ? (
                  <Link className="black-text accent-4" to={`/myposts/${_id}`}>
                    {postsCount ? postsCount : 0} : Posts
                  </Link>
                ) : (
                  <a href="/" className="black-text accent-4">
                    {postsCount ? postsCount : 0} : Posts
                  </a>
                )}
              </div>
              <div>
                <Link
                  className="black-text accent-4"
                  to={`/followers/${idUser}`}
                >
                  {followers ? followers?.length : "0"} : Followers
                </Link>
              </div>
              <div>
                <Link
                  className="black-text accent-4"
                  to={`/following/${idUser}`}
                >
                  {following ? following?.length : "0"} : Following
                </Link>
              </div>
            </div>
          </div>
        </div>
        <div className={style.Span}></div>
        <div className={style.Post}>
          {postsData.length ? (
            <Gallery
              postsData={arr}
              isMyPosts={false}
              onScroll={hendleScroll}
              postFollowing={false}
            />
          ) : (
            <div className="center-align">
              {!isFetching
                ? "The results were not found for your request."
                : ""}
            </div>
          )}
          <div className={style.isLoading}>
            {isFetching ? (
              <div>Loading...</div>
            ) : (
              <div className={style.sicretDiv}>----------</div>
            )}
          </div>
          <div className={style.sicretDiv}>----------</div>
        </div>
      </div>
    </div>
  );
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(React.memo(Profile));
