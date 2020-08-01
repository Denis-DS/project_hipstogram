import React, { useEffect, useState } from "react";
import { Dispatch, bindActionCreators } from "redux";
import * as actions from "../../../store/posts/actions";
import { IRootAction, IRootState } from "../../../store/rootReducer";
import { connect } from "react-redux";
import { RouteComponentProps } from "react-router-dom";
import style from "./style.module.scss";

import Gallery from "../Gallery";

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
  pagesCount: state.posts.pagesCount,
  postsLimit: state.posts.postsLimit,
  sortType: state.posts.sortType,
  isFetching: state.posts.isFetching,
  postsCount: state.posts.postsCount,
});
type TParams = { id: string; q: string };
type TProps = ReturnType<typeof mapDispatchToProps> &
  ReturnType<typeof mapStateToProps> &
  RouteComponentProps<TParams>;

const PostsBlock = ({
  match,
  postsData,
  postsCount,
  setPageIncrement,
  getPosts,
  setPageDecrement,
  isFetching,
}: TProps) => {
  const quest = match.params.q || null;
  const isMyPosts = match.path.includes("myposts");
  const idUser = null;
  const type = "posts";
  const [arr, setArr] = useState(postsData);

  const potsStore = () => {
    if (postsData.length !== 0 && arr.length < postsCount) {
      setArr(arr.concat(postsData));
    }
  };

  const hendleScroll = () => {
    if (postsCount != null || arr.length < postsCount) {
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
      <div className={!isMyPosts ? style.Post : "row"}>
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
