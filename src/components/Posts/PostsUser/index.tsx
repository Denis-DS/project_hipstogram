import React, { useEffect, useState } from "react";
import { Dispatch, bindActionCreators } from "redux";
import * as actions from "../../../store/posts/actions";
import { IRootAction, IRootState } from "../../../store/rootReducer";
import { connect } from "react-redux";
import { RouteComponentProps } from "react-router-dom";
import Gallery from "../Gallery";
import style from "./style.module.scss";

const mapDispatchToProps = (dispatch: Dispatch<IRootAction>) =>
  bindActionCreators(
    {
      getPosts: actions.getPosts.request,
      togglePreloader: actions.togglePreloader,
      setPageIncrement: actions.setPageIncrement,
      setPageDecrement: actions.setPageDecrement,
    },
    dispatch
  );

const mapStateToProps = (state: IRootState) => ({
  postsData: state.posts.postsData,
  isFetching: state.posts.isFetching,
  postsCount: state.posts.postsCount,
});
type TParams = { id: string; q: string };
type TProps = ReturnType<typeof mapDispatchToProps> &
  ReturnType<typeof mapStateToProps> &
  RouteComponentProps<TParams>;

const PostsBlock = ({
  postsData,
  isFetching,
  postsCount,
  getPosts,
  setPageIncrement,
  setPageDecrement,
  match,
}: TProps) => {
  const quest = match.params.q || null;
  const isMyPosts = match.path.includes("myposts");
  const idUser = null;
  const type = "myposts";

  const [arr, setArr] = useState(postsData);

  const potsStore = () => {
    if (postsData.length !== 0 && arr.length < postsCount) {
      setArr(arr.concat(postsData));
    }
  };

  const hendleScroll = () => {
    if (postsData != null || arr.length < postsCount) {
      setPageIncrement();
      getPosts({ type, quest, idUser });
    }
  };

  useEffect(() => {
    potsStore();
  }, [postsData]);

  useEffect(() => {
    setArr([]);
    setPageDecrement();
    getPosts({ type, quest, idUser });
  }, [match.params.id]);

  return (
    <React.Fragment>
      <h1>"My post Edit"</h1>
      <div className={style.Post}>
        {postsData.length ? (
          <Gallery
            postsData={arr}
            isMyPosts={isMyPosts}
            onScroll={hendleScroll}
            postFollowing={false}
          />
        ) : (
          <div className="center-align">
            {!isFetching ? "The results were not found for your request." : ""}
          </div>
        )}
        <div className={style.isLoading}>
          {isFetching ? (
            <div>Loading...</div>
          ) : (
            <div className={style.sicretDiv}>----------</div>
          )}
        </div>
        <div className={style.sicretDiv}>----------</div>
      </div>
    </React.Fragment>
  );
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(React.memo(PostsBlock));
