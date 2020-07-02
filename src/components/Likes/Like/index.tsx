import React from "react";
import style from "./style.module.scss";
import { Link } from "react-router-dom";

export interface IProps {
  _id: string;

  nick: string;

  avatar: string;
}

const Comment = (props: IProps) => {
  return (
    <div className={style.comment}>
      <div className={style.header}>
        <Link to={`/user/${props._id}`}>
          <img src={`/${props.avatar}`} alt={props.nick} />
          <span className={style.author}>{props.nick}</span>
        </Link>
      </div>
    </div>
  );
};

export default React.memo(Comment);
