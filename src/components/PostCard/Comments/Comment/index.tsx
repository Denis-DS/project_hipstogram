import React from "react";
import style from "./style.module.scss";
import Answer from "./Answer";

export interface IProps {
  _id: string;
  createdAt: string;
  nick: string;
  text: string;
  avatar: string;
  answerExist: boolean;
}

const Comment = (props: IProps) => {
  return (
    <div className={style.comment}>
      <div className={style.header}>
        {props.avatar !== null ? (
          <img src={`/${props.avatar}`} alt={props.nick} />
        ) : (
          <span className="large material-icons black-text">face</span>
        )}
        {/* <img src={`/${props.avatar}`} alt={props.nick} /> */}
        <span className={style.author}>{props.nick}</span>
      </div>
      <p>{props.text}</p>
      <span className={style.date}>{props.createdAt}</span>
      {props.answerExist && (
        <Answer commentID={props._id} answerClosed={true} />
      )}
    </div>
  );
};

export default React.memo(Comment);
