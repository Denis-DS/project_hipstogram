import React from "react";
import { connect } from "react-redux";
import * as actions from "../../../store/posts/actions";
import { IRootState, IRootAction } from "../../../store/rootReducer";
import { Dispatch, bindActionCreators } from "redux";

const mapStateToProps = (state: IRootState) => ({
  postsLimit: state.posts.postsLimit,
  sortType: state.posts.sortType,
  pagesCount: state.posts.pagesCount,
});

const mapDispatchToProps = (dispatch: Dispatch<IRootAction>) =>
  bindActionCreators(
    {
      setPostsLimit: actions.setPostsLimit,
      setPostsSort: actions.setPostsSort,
    },
    dispatch
  );

type IProps = ReturnType<typeof mapDispatchToProps> &
  ReturnType<typeof mapStateToProps>;

const Sorting = (props: IProps) => {
  const postsLimitHandler = (e: React.FormEvent<HTMLSelectElement>) => {
    if (e.currentTarget.value !== "All") {
      props.setPostsLimit(Number(e.currentTarget.value));
    } else {
      props.setPostsLimit(300);
    }

    props.setPostsSort("dateDesc");
  };

  const advsLimitArr = [12, 30, 60, "All"];

  return (
    <React.Fragment>
      <div className="">
        <label>Posts</label>
        <select
          defaultValue={props.postsLimit}
          className="browser-default"
          onChange={postsLimitHandler}
        >
          {advsLimitArr.map((d) => (
            <option key={d} value={d}>
              {d}
            </option>
          ))}
        </select>
      </div>
    </React.Fragment>
  );
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(React.memo(Sorting));
