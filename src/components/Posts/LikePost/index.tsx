import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { IRootAction, IRootState } from "../../../store/rootReducer";
import { Dispatch, bindActionCreators } from "redux";
import * as actions from "../../../store/like/actions";
import style from "./style.module.scss";

const mapDispatchToProps = (dispatch: Dispatch<IRootAction>) =>
  bindActionCreators(
    {
      setLike: actions.setLike.request,
      getLike: actions.getLike.request,
      delLike: actions.delLike.request,
    },
    dispatch
  );

const mapStateToProps = (state: IRootState) => ({
  postCard: state.postCard.postCardData,
  userId: state.auth.authData.id,
  likeData: state.like.likeData,
});

type IProps = {
  postID: string;
};

type TProps = ReturnType<typeof mapDispatchToProps> &
  ReturnType<typeof mapStateToProps> &
  IProps;

const LikePost = (props: TProps) => {
  const [toggle, setToggle] = useState(true);

  const sendAnswerHandler = () => {
    props.setLike({
      user: props.userId,
      post: props.postID,
    });
    setToggle(false);
  };

  useEffect(() => {
    document
      .getElementById("likeButton")
      ?.addEventListener("click", sendAnswerHandler);

    return () =>
      document
        .getElementById("likeButton")
        ?.removeEventListener("click", sendAnswerHandler);
  }, []);

  const likeUser = () => {
    props.postCard.likes?.map((d) => {
      if (d.owner._id === props.userId) {
        setToggle(false);
      }
    });
  };

  useEffect(() => {
    likeUser();
  });

  return (
    <div>
      <button
        id="likeButton"
        className={style.LikeButton}
        disabled={toggle ? false : true}
      >
        {toggle ? (
          <span className="large material-icons black-text">
            favorite_border
          </span>
        ) : (
          <span className="large material-icons red-text">favorite</span>
        )}
      </button>
    </div>
  );
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(React.memo(LikePost));
