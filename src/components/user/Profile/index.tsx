import React, { useEffect } from "react";
import classnames from "classnames";
import { bindActionCreators, Dispatch } from "redux";
import { IRootAction, IRootState } from "../../../store/rootReducer";
import * as profileActions from "../../../store/profile/actions";
import * as actions from "../../../store/posts/actions";
import { IPosts } from "../../../store/posts/types";
import style from "./style.module.scss";
import { connect } from "react-redux";
import Avatar from "../Avatar";
import Post from "../../Posts/Post";
import { Link, RouteComponentProps } from "react-router-dom";
import Sorting from "../../Posts/Sorting";

const mapDispatchToProps = (dispatch: Dispatch<IRootAction>) =>
  bindActionCreators(
    {
      getPosts: actions.getPosts.request,
      getProfile: profileActions.getProfile.request,
      deleteSuccess: profileActions.deleteSuccess,
    },
    dispatch
  );

const mapStateToProps = (state: IRootState) => ({
  id: state.profile.profileData._id,
  login: state.profile.profileData.login,
  nick: state.profile.profileData.nick,
  followers: state.profile.profileData.followers,
  following: state.profile.profileData.following,
  errorServer: state.profile.profileData.error,
  success: state.profile.profileData.success,
  postsData: state.posts.postsData,
  pagesCount: state.posts.pagesCount,
  postsLimit: state.posts.postsLimit,
});

type TParams = { id: string; q: string };

type IProps = ReturnType<typeof mapDispatchToProps> &
  ReturnType<typeof mapStateToProps> &
  RouteComponentProps<TParams>;

const Profile: React.FC<IProps> = (props: IProps) => {
  const quest = props.match.params.q || null;
  const page = 1;
  const idUser = props.match.params.id;

  useEffect(() => {
    props.getProfile({ idUser });
    // if (!props.id) {
    //   props.getProfile({ idUser: props.match.params.id });
    // }
  }, [props.match]);

  useEffect(() => {
    const type = "myposts";
    props.getPosts({ type, page, quest, idUser });
  }, [props.match, props.postsLimit]);

  return (
    <div className={classnames("row", style.wrapper)}>
      <div>
        <div className={style.Flex}>
          <div>
            <Avatar />
          </div>
          <div className={style.Info}>
            <div>
              <h1 className="center-align">{props.login}</h1>
            </div>
            <div className={style.UserInfo}>
              <div>{0}: posts</div>
              <div>
                <Link className="black-text accent-4" to="/">
                  {"0"} : followers
                </Link>
              </div>
              <div>
                <Link className="black-text accent-4" to="/">
                  {"0"} : following
                </Link>
              </div>
            </div>
          </div>
        </div>
        <div className={style.Posts}>
          <Sorting />
          <div className={style.Post}>
            {props.postsData && props.postsData.length ? (
              props.postsData.map((d: IPosts) => (
                <Post
                  likesCount={d.likesCount}
                  comments={d.comments}
                  key={d._id}
                  _id={d._id}
                  title={d.title}
                  createdAt={d.createdAt}
                  images={d.images}
                />
              ))
            ) : (
              <div className="center-align">
                The results were not found for your request.{" "}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(React.memo(Profile));
