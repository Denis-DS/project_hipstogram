import React, { useEffect } from "react";
import { Dispatch, bindActionCreators } from "redux";
import style from "./style.module.scss";
import * as actions from "../../store/profile/actions";
import { IRootAction, IRootState } from "../../store/rootReducer";
import LikcSubscrib from "./Subscrib";
import { connect } from "react-redux";
import { IFollow } from "../../store/profile/types";
import { RouteComponentProps } from "react-router-dom";

const mapDispatchToProps = (dispatch: Dispatch<IRootAction>) =>
  bindActionCreators(
    {
      getProfile: actions.getProfile.request,
    },
    dispatch
  );

const mapStateToProps = (state: IRootState) => ({
  followers: state.profile.profileData.followers,
  following: state.profile.profileData.following,
});

type TParams = { id: string };

type TProps = ReturnType<typeof mapDispatchToProps> &
  ReturnType<typeof mapStateToProps> &
  RouteComponentProps<TParams>;

const Likes = ({ match, getProfile, followers, following }: TProps) => {
  const isMyFollowers = match.path.includes("followers");

  useEffect(() => {
    getProfile({ idUser: match.params.id });
  }, [match]);

  const printComments = (subscribe: IFollow[] | null) => {
    if (subscribe !== null) {
      return subscribe.map((d: IFollow) => (
        <li key={d._id}>
          <LikcSubscrib
            avatar={
              d.avatar?.url
                ? d.avatar?.url
                : "images/c21cf837580918bd61242a5fb31b84eb"
            }
            login={d.login}
            _id={d._id}
          />
        </li>
      ));
    } else {
      return;
    }
  };

  const url = isMyFollowers ? followers : following;

  return (
    <div className={style.commentsWrapper}>
      <h2>{isMyFollowers ? "Followers" : "Following"}</h2>
      <div className={style.comments}>
        {url ? (
          <ul>{printComments(url)}</ul>
        ) : (
          <p>Not yet {isMyFollowers ? "followers" : "following"}</p>
        )}
      </div>
    </div>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(React.memo(Likes));
