import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { IRootAction, IRootState } from "../../../store/rootReducer";
import { Dispatch, bindActionCreators } from "redux";
import * as actions from "../../../store/profile/actions";

const mapDispatchToProps = (dispatch: Dispatch<IRootAction>) =>
  bindActionCreators(
    {
      setFollowing: actions.setFollowing.request,
    },
    dispatch
  );

const mapStateToProps = (state: IRootState) => ({
  followers: state.profile.profileData.followers,
  userID: state.auth.authData.id,
});

type IProps = {
  followingID: string;
};

type TProps = ReturnType<typeof mapDispatchToProps> &
  ReturnType<typeof mapStateToProps> &
  IProps;

const Following = (props: TProps) => {
  const [toggle, setToggle] = useState(false);

  const sendFollowingHandler = () => {
    console.log(props.followingID);
    props.setFollowing({
      followingID: props.followingID,
    });
    setToggle(true);
  };

  useEffect(() => {
    document
      .getElementById("following")
      ?.addEventListener("click", sendFollowingHandler);

    return () =>
      document
        .getElementById("following")
        ?.removeEventListener("click", sendFollowingHandler);
  }, []);

  const follow = () => {
    props.followers?.map((d) => {
      if (d._id === props.userID) {
        setToggle(true);
      }
    });
  };

  useEffect(() => {
    follow();
  });

  return (
    <React.Fragment>
      <button
        id="following"
        className="btn waves-effect waves-teal"
        disabled={toggle ? true : false}
      >
        {toggle ? "Unfollow" : "Follow"}
      </button>
    </React.Fragment>
  );
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(React.memo(Following));
