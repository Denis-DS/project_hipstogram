import React from "react";
import style from "./style.module.scss";
import { Link } from "react-router-dom";

export interface IProps {
  _id: string;
  login: string;
  avatar: string;
}

const Comment = (props: IProps) => {
  return (
    <div className={style.comment}>
      <div className={style.header}>
        <Link to={`/profile/${props._id}`}>
          <div className={style.miniPost}>
            <img src={`/${props.avatar}`} alt={props.login} />
            <span className={style.author}>
              {props.login ? props.login : "No Name"}
            </span>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default React.memo(Comment);
