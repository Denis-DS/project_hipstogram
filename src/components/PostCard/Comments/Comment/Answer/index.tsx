import React, { useState } from "react";
import style from "./style.module.scss";
import { IRootAction } from "../../../../../store/rootReducer";
import { connect } from "react-redux";
import { Dispatch, bindActionCreators } from "redux";
import * as actions from "../../../../../store/comments/actions";

interface IAnswer {
  answerClosed: boolean;
  commentID: string | null;
}

const mapDispatchToProps = (dispatch: Dispatch<IRootAction>) =>
  bindActionCreators(
    {
      setComment: actions.setComment.request,
    },
    dispatch
  );

type TProps = ReturnType<typeof mapDispatchToProps> & IAnswer;

const Answer = (props: TProps) => {
  const [toggle, setToggle] = useState(props.answerClosed);
  const [text, setText] = useState("");

  const toggleHandler = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    setToggle(!toggle);
  };

  const changeTextHandler = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setText(e.currentTarget.value);
  };

  const sendAnswerHandler = () => {
    props.setComment({ answerTo: props.commentID, text });
    setToggle(!toggle);
    setText("");
  };

  return (
    <div>
      {toggle ? (
        <button onClick={toggleHandler} className={style.answerButton}>
          Answer
        </button>
      ) : (
        <div className={style.answerWrapper}>
          <textarea value={text} onChange={changeTextHandler}></textarea>
          <div className={style.buttons}>
            <button
              disabled={text.trim() ? false : true}
              onClick={sendAnswerHandler}
              className={style.sendButton}
            >
              Send
            </button>
            {props.answerClosed && (
              <button onClick={toggleHandler} className={style.cancelButton}>
                Cancel
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default connect(null, mapDispatchToProps)(React.memo(Answer));
