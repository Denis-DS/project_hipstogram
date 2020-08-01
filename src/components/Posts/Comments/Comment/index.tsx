import React from "react";
import style from "./style.module.scss";
import Answer from "./Answer";
import { Link } from "react-router-dom";

export interface IProps {
  _id: string;
  createdAt: string;
  nick: string;
  text: string;
  avatar: string;
  answerExist: boolean;
  userId: string;
}

const Comment = ({
  _id,
  createdAt,
  nick,
  text,
  avatar,
  answerExist,
  userId,
}: IProps) => {
  return (
    <div className={style.comment}>
      <div className={style.header}>
        <Link to={`/profile/${userId}`}>
          {avatar !== null ? (
            <img src={`/${avatar}`} alt={nick} />
          ) : (
            <span className="large material-icons black-text">face</span>
          )}
        </Link>
        {/* <img src={`/${avatar}`} alt={nick} /> */}
        <span className={style.author}>{nick}</span>
      </div>
      <p>{text}</p>
      <span className={style.date}>{createdAt}</span>
      {answerExist && <Answer commentID={_id} answerClosed={true} />}
    </div>
  );
};

export default React.memo(Comment);
