import React, { useEffect } from "react";
import { Dispatch, bindActionCreators } from "redux";
import style from "./style.module.scss";
import classnames from "classnames";
import * as actions from "../../store/post/actions";
import { IRootAction, IRootState } from "../../store/rootReducer";
import { connect } from "react-redux";
import { RouteComponentProps, Link } from "react-router-dom";
import NotFound from "../NotFound";
import Message from "./AddMessage";
import Comments from "./Comments";
import LikePost from "./LikePost";

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
});

type TParams = { id: string };

type TProps = ReturnType<typeof mapDispatchToProps> &
  ReturnType<typeof mapStateToProps> &
  RouteComponentProps<TParams>;

const PostCard = (props: TProps) => {
  useEffect(() => {
    props.getPostCard(props.match.params.id);
    return () => {
      props.deletePostCard();
    };
  }, []);

  useEffect(() => {
    const elems = document.querySelectorAll(".materialboxed");
    M.Materialbox.init(elems, { inDuration: 0, outDuration: 0 });
  }, [props.postCard]);

  const elems = document.querySelectorAll(".modal");
  M.Modal.init(elems, {});

  const img =
    props.postCard.images[0]?.url ||
    "https://boatparts.com.ua/design/boatparts/images/no_image.png";

  if (props.isPost) {
    return (
      <div className={classnames("row", style.rowcorrect)}>
        <div className="col m3 s12">
          <div className={style.sidebarWrapper}>
            <div className={style.userWrapper}>
              <Link to={`/user/${props.postCard.userId}`}>
                <div className={style.userAtr}>
                  <div>
                    <img
                      alt={props.postCard.nick}
                      src={props.postCard.avatar}
                    />
                  </div>
                  <div className={style.nick}>
                    <span>{props.postCard.nick}</span>
                  </div>
                </div>
              </Link>
            </div>
          </div>
        </div>
        <Message nick={props.postCard.nick} userId={props.postCard.userId} />
        <div className="">
          <div className={style.contentWrapper}>
            <div className={style.topPhoto}>
              <img
                alt={props.postCard.title}
                className="materialboxed"
                src={img}
              />
            </div>
            <div className={style.content}>
              <div className={style.userActions}>
                <div className={style.userTriger}>
                  <LikePost postID={props.match.params.id} />
                  <a
                    className={classnames("modal-trigger", style.messageBtn)}
                    href="#modal1"
                  >
                    <i className="material-icons right">send</i>
                  </a>
                </div>
                <div>
                  <Link
                    to={`/postlike/${props.postCard._id}`}
                    className="black-text accent-4"
                  >
                    <p>{props.postCard.likesCount} :like</p>
                  </Link>
                </div>
              </div>
              <p>{props.postCard.title}</p>

              <span className={style.data}>{props.postCard.postDate}</span>
            </div>
            <Comments idPost={props.match.params.id} />
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
