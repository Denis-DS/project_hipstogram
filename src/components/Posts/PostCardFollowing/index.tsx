import React from "react";
import style from "./style.module.scss";
import classnames from "classnames";
import { IPostcardData } from "../../../store/post/types";
import { Link } from "react-router-dom";

type TParams = { postID: string; postCard: IPostcardData };

const PostCard = ({ postCard, postID }: TParams) => {
  const elems = document.querySelectorAll(".modal");
  M.Modal.init(elems, {});

  const img =
    postCard.images[0]?.url || "/images/dccf1f2c0f3750711e76f4ef5e24b041";

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
      <div className="">
        <div className={style.contentWrapper}>
          <div className={style.topPhoto}>
            <img alt={postCard.title} className="materialboxed" src={img} />
          </div>
          <div className={style.content}>
            <div className={style.userActions}>
              <div className={style.userTriger}>
                <Link
                  className={classnames(style.likeBtn)}
                  to={`/postcard/${postCard._id}`}
                >
                  <span className="large material-icons black-text">
                    favorite_border
                  </span>
                </Link>
                <Link
                  className={classnames(style.messageBtn)}
                  to={`/postcard/${postCard._id}`}
                >
                  <i className="material-icons right">send</i>
                </Link>
              </div>
              <div>
                <Link
                  to={`/postlike/${postCard._id}`}
                  className="black-text accent-4"
                >
                  <p>{postCard.likes?.length} :like</p>
                </Link>
              </div>
            </div>
            <p>{postCard.title}</p>
            <span className={style.data}>{postCard.postDate}</span>
          </div>
          <Link to={`/postcard/${postID}`} className={style.commentsCount}>
            Comments: {postCard.comments?.length ? postCard.comments.length : 0}
          </Link>
        </div>
      </div>
    </div>
  );
};

export default React.memo(PostCard);
