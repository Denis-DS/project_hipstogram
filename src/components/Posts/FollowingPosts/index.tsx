import React, { useEffect, useState } from "react";
import { Dispatch, bindActionCreators } from "redux";
import * as actions from "../../../store/posts/actions";
import { getSuggestions } from "../../../store/user/actions";
import { getProfile } from "../../../store/profile/actions";
import { IRootAction, IRootState } from "../../../store/rootReducer";
import { connect } from "react-redux";
import { RouteComponentProps } from "react-router-dom";
import style from "./style.module.scss";
import Gallery from "../Gallery";
import { Link } from "react-router-dom";

const mapDispatchToProps = (dispatch: Dispatch<IRootAction>) =>
  bindActionCreators(
    {
      getPosts: actions.getFollowingPosts.request,
      togglePreloader: actions.togglePreloader,
      setPageIncrement: actions.setPageIncrement,
      setPageDecrement: actions.setPageDecrement,
      getSuggestionsUser: getSuggestions.request,
      getProfile: getProfile.request,
    },
    dispatch
  );

const mapStateToProps = (state: IRootState) => ({
  postsFollowingData: state.posts.postsFollowingData,
  pagesCount: state.posts.pagesCount,
  postsFollowingCount: state.posts.postsFollowingCount,
  postsLimit: state.posts.postsLimit,
  sortType: state.posts.sortType,
  isFetching: state.posts.isFetching,
  postsCount: state.posts.postsCount,
  userDataSuggestions: state.user.userDataSuggestions,
  id: state.profile.profileData._id,
});
type TParams = { id: string; q: string };
type TProps = ReturnType<typeof mapDispatchToProps> &
  ReturnType<typeof mapStateToProps> &
  RouteComponentProps<TParams>;

const PostsBlock = ({
  match,
  postsFollowingData,
  postsFollowingCount,
  setPageIncrement,
  getPosts,
  setPageDecrement,
  isFetching,
  userDataSuggestions,
  getSuggestionsUser,
  getProfile,
}: TProps) => {
  const quest = match.params.q || null;
  const isMyPosts = match.path.includes("myposts");
  const idUser = null;
  const type = "posts";
  const [arr, setArr] = useState(postsFollowingData);

  const potsStore = () => {
    if (postsFollowingData.length !== 0 && arr.length < postsFollowingCount) {
      setArr(arr.concat(postsFollowingData));
    }
  };

  const handleScroll = () => {
    if (postsFollowingCount != null || arr.length < postsFollowingCount) {
      setPageIncrement();
      getPosts({ type, quest, idUser });
    }
  };

  useEffect(() => {
    potsStore();
  }, [postsFollowingData]);

  useEffect(() => {
    getSuggestionsUser();
    getProfile({ idUser: null });
    setArr([]);
    setPageDecrement();
    getPosts({ type, quest, idUser });
  }, []);

  return (
    <React.Fragment>
      <div className={style.Post}>
        {postsFollowingData ? (
          <div>
            <div>
              <Gallery
                postsData={arr}
                isMyPosts={isMyPosts}
                onScroll={handleScroll}
                postFollowing={true}
              />
            </div>
            <div className={style.Menu}>
              <div className={style.Suggestions}>Suggestions For You</div>
              {userDataSuggestions.map((d) => {
                return (
                  <div className={style.comment} key={d._id}>
                    <div className={style.header}>
                      <Link to={`/profile/${d._id}`}>
                        <div className={style.miniPost}>
                          <img src={`${d.avatar}`} alt={d.login} />
                          <div>
                            <span className={style.author}>
                              {d.login ? d.login : "No Name"}
                            </span>
                          </div>
                        </div>
                      </Link>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
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
