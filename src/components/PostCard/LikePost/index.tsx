import React, { useState } from "react";
import { IRootAction } from "../../../store/rootReducer";
import { connect } from "react-redux";
import { Dispatch, bindActionCreators } from "redux";
import * as actions from "../../../store/like/actions";

interface IAnswer {
  postID: string | null;
}

const mapDispatchToProps = (dispatch: Dispatch<IRootAction>) =>
  bindActionCreators(
    {
      setLike: actions.setLike.request,
    },
    dispatch
  );

type TProps = ReturnType<typeof mapDispatchToProps> & IAnswer;

const LikePost = (props: TProps) => {
  const [toggle, setToggle] = useState(true);
  const text = "";

  const sendAnswerHandler = () => {
    console.log("send");
    setToggle(!toggle);
    props.setLike({ answerTo: props.postID, text });
  };

  return (
    <div>
      <button onClick={sendAnswerHandler}>
        {toggle ? (
          <span className="large material-icons black-text">
            favorite_border
          </span>
        ) : (
          <span className="large material-icons black-text">favorite</span>
        )}
      </button>
    </div>
  );
};

export default connect(null, mapDispatchToProps)(React.memo(LikePost));
