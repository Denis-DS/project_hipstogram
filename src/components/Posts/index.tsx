import React, { useEffect } from "react";
import { Dispatch, bindActionCreators } from "redux";
import * as actions from "../../store/posts/actions";
import { IRootAction, IRootState } from "../../store/rootReducer";
import { connect } from "react-redux";
import { IPosts } from "../../store/posts/types";
import Adv from "./PostUser";
import { RouteComponentProps } from "react-router-dom";
import AdvUser from "./Post";
import Preloader from "../Preloader";
import style from "./style.module.scss";
import Pagination from "../Pagination";
import Sorting from "./Sorting";

const mapDispatchToProps = (dispatch: Dispatch<IRootAction>) =>
  bindActionCreators(
    {
      getPosts: actions.getPosts.request,
      togglePreloader: actions.togglePreloader,
    },
    dispatch
  );

const mapStateToProps = (state: IRootState) => ({
  postsData: state.posts.postsData,
  pagesCount: state.posts.pagesCount,
  postsLimit: state.posts.postsLimit,
  sortType: state.posts.sortType,
  isFetching: state.posts.isFetching,
});
type TParams = { id: string; q: string };
type TProps = ReturnType<typeof mapDispatchToProps> &
  ReturnType<typeof mapStateToProps> &
  RouteComponentProps<TParams>;

const PostsBlock = (props: TProps) => {
  const quest = props.match.params.q || null;
  const page = props.match.params.id ? Number(props.match.params.id) : 1;
  const isMyPosts = props.match.path.includes("myposts");
  const pathPosts = quest ? `/q-${quest}` : "";
  const pathMyPosts = quest ? `/myposts/q-${quest}` : "/myposts";
  let h1 = isMyPosts ? "My post Edit" : "Posts";
  quest && (h1 = `Search: ${quest}`);
  const idUser = null;

  useEffect(() => {
    const type = isMyPosts ? "myposts" : "psts";
    props.getPosts({ type, page, quest, idUser });
  }, [props.match, props.postsLimit, props.sortType]);

  if (!props.isFetching) {
    return (
      <React.Fragment>
        <Sorting />
        <h1>{h1}</h1>
        <div className="row"></div>
        <div className={!isMyPosts ? style.Post : "row"}>
          {props.postsData.length ? (
            props.postsData.map((d: IPosts) => {
              if (!isMyPosts) {
                return (
                  <AdvUser
                    likesCount={d.likesCount}
                    comments={d.comments}
                    key={d._id}
                    _id={d._id}
                    title={d.title}
                    createdAt={d.createdAt}
                    images={d.images}
                  />
                );
              } else {
                return (
                  <Adv
                    likesCount={d.likesCount}
                    comments={d.comments}
                    key={d._id}
                    _id={d._id}
                    title={d.title}
                    createdAt={d.createdAt}
                    images={d.images}
                  />
                );
              }
            })
          ) : (
            <div className="center-align">
              The results were not found for your request.{" "}
            </div>
          )}
        </div>
        <Pagination
          pagesCount={props.pagesCount}
          currentPage={page}
          path={isMyPosts ? pathMyPosts : pathPosts}
        />
      </React.Fragment>
    );
  } else {
    return <Preloader />;
  }
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(React.memo(PostsBlock));
