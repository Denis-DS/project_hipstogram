import React, { useEffect } from "react";
import { Dispatch, bindActionCreators } from "redux";
import style from "./style.module.scss";
import * as actions from "../../store/like/actions";
import { IRootAction, IRootState } from "../../store/rootReducer";
import Like from "./Like";
import { connect } from "react-redux";
import { IGetLikeSuccess } from "../../store/like/types";
import { RouteComponentProps } from "react-router-dom";

const mapDispatchToProps = (dispatch: Dispatch<IRootAction>) =>
  bindActionCreators(
    {
      getLike: actions.getLike.request,
    },
    dispatch
  );

const mapStateToProps = (state: IRootState) => ({
  likeData: state.like.likeData,
});

type TParams = { id: string };

type TProps = ReturnType<typeof mapDispatchToProps> &
  ReturnType<typeof mapStateToProps> &
  RouteComponentProps<TParams>;

const Likes = (props: TProps) => {
  useEffect(() => {
    props.getLike({ idPost: props.match.params.id });
  }, []);

  const printComments = (commentsData: IGetLikeSuccess[]) => {
    return commentsData.map((d: IGetLikeSuccess) => (
      <li key={d._id}>
        <Like avatar={d.avatar} nick={d.nick} _id={d._id} />
      </li>
    ));
  };

  return (
    <div className={style.commentsWrapper}>
      <h2>Likes</h2>
      <div className={style.comments}>
        {!props.likeData.length && <p>Not yet like</p>}
        <ul>{printComments(props.likeData)}</ul>
      </div>
    </div>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(React.memo(Likes));
