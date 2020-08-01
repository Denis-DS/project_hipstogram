import React, { useEffect } from "react";
import { Dispatch, bindActionCreators } from "redux";
import style from "./style.module.scss";
import classnames from "classnames";
import * as actions from "../../../store/post/actions";
import { IRootAction, IRootState } from "../../../store/rootReducer";
import { connect } from "react-redux";
import { RouteComponentProps, Link } from "react-router-dom";
import NotFound from "../../NotFound";
import Message from "../../AddMessage";
import Comments from "../Comments";
import LikePost from "../LikePost";
import LikeCount from "../LikeCount";

const mapDispatchToProps = (dispatch: Dispatch<IRootAction>) =>
  bindActionCreators(
    {
      getPostCard: actions.getPostCard.request,
      deletePostCard: actions.deletePostCard,
    },
    dispatch
  );

const mapStateToProps = (state: IRootState) => ({
  postCard: state.postCard.postCardData,
  isPost: state.postCard.isPost,
  userId: state.auth.authData.id,
  nick: state.profile.profileData.nick,
  id: state.profile.profileData._id,
});

type TParams = { id: string };

type TProps = ReturnType<typeof mapDispatchToProps> &
  ReturnType<typeof mapStateToProps> &
  RouteComponentProps<TParams>;

const PostCard = ({
  match,
  getPostCard,
  deletePostCard,
  postCard,
  isPost,
}: TProps) => {
  const postID = match.params.id;

  useEffect(() => {
    getPostCard(postID);
    return () => {
      deletePostCard();
    };
  }, []);

  useEffect(() => {
    const elems = document.querySelectorAll(".materialboxed");
    M.Materialbox.init(elems, { inDuration: 0, outDuration: 0 });
  }, [postCard]);

  const elems = document.querySelectorAll(".modal");
  M.Modal.init(elems, {});

  const img =
    postCard.images[0]?.url || "/images/dccf1f2c0f3750711e76f4ef5e24b041";

  if (isPost) {
    return (
      <div className={classnames("row", style.rowcorrect)}>
        <div className="col m12 s12">
          <div className={style.sidebarWrapper}>
            <div className={style.userWrapper}>
              <Link to={`/profile/${postCard.userId}`} className={style.src}>
                <div className={style.userAtr}>
                  <div>
                    <img alt={postCard.login} src={postCard.avatar} />
                  </div>
                  <div className={style.nick}>
                    <span>{postCard.login}</span>
                  </div>
                </div>
              </Link>
            </div>
          </div>
        </div>
        <Message nick={postCard.login} userId={postCard.userId} />
        <div className="">
          <div className={style.contentWrapper}>
            <div className={style.topPhoto}>
              <img alt={postCard.title} className="materialboxed" src={img} />
            </div>
            <div className={style.content}>
              <div className={style.userActions}>
                <div className={style.userTriger}>
                  <LikePost postID={postID} />
                  <a
                    className={classnames("modal-trigger", style.messageBtn)}
                    href="#modal1"
                  >
                    <i className="material-icons right">send</i>
                  </a>
                </div>
                <div>
                  <Link
                    to={`/postlike/${postCard._id}`}
                    className="black-text accent-4"
                  >
                    <LikeCount postID={postID} />
                  </Link>
                </div>
              </div>
              <p>{postCard.title}</p>
              <span className={style.data}>{postCard.postDate}</span>
            </div>
            <Comments idPost={match.params.id} />
          </div>
        </div>
      </div>
    );
  } else {
    return <NotFound />;
  }
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(React.memo(PostCard));
