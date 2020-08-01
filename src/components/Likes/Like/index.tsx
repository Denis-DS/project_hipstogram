import React from "react";
import style from "./style.module.scss";
import { Link } from "react-router-dom";

export interface IProps {
  _id: string;
  login: string;
  avatar: string;
  images: string | null;
  idPost: string;
}

const Comment = (props: IProps) => {
  return (
    <div className={style.comment}>
      <div className={style.header}>
        <Link to={`/profile/${props._id}`}>
          <div className={style.miniPost}>
            <img src={`/${props.avatar}`} alt={props.login} />
            <span className={style.author}>{props.login}</span>
          </div>
        </Link>
        <Link to={`/postcard/${props.idPost}`}>
          <div className={style.miniPost}>
            <p className={style.author}>Post:</p>
            <img
              src={`/${props.images}`}
              alt={props.login}
              className={style.img}
            />
          </div>
        </Link>
      </div>
    </div>
  );
};

export default React.memo(Comment);
