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

const Likes = ({ getLike, match, likeData }: TProps) => {
  useEffect(() => {
    getLike({ idPost: match.params.id });
  }, [match]);

  const printComments = (commentsData: IGetLikeSuccess[]) => {
    return commentsData.map((d: IGetLikeSuccess) => (
      <li key={d.idLike}>
        <Like
          avatar={d.avatar}
          login={d.login}
          _id={d._id}
          images={d.images}
          idPost={d.idPost}
        />
      </li>
    ));
  };

  return (
    <div className={style.commentsWrapper}>
      <h2>Likes</h2>
      <div className={style.comments}>
        {!likeData.length && <p>Not yet like</p>}
        <ul>{printComments(likeData)}</ul>
      </div>
    </div>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(React.memo(Likes));
