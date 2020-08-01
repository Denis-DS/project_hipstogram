import React, { useEffect } from "react";
import * as actions from "../../../store/post/actions";
import { IRootAction, IRootState } from "../../../store/rootReducer";
import { Dispatch, bindActionCreators } from "redux";
import { connect } from "react-redux";

const mapDispatchToProps = (dispatch: Dispatch<IRootAction>) =>
  bindActionCreators(
    {
      getPostCard: actions.getPostCard.request,
    },
    dispatch
  );

const mapStateToProps = (state: IRootState) => ({
  postCard: state.postCard.postCardData,
  likeData: state.like.likeData,
  id: state.profile.profileData._id,
});

type IProps = {
  postID: string;
};
type TProps = ReturnType<typeof mapDispatchToProps> &
  ReturnType<typeof mapStateToProps> &
  IProps;

const LikeCount = ({ postID, likeData, postCard, getPostCard }: TProps) => {
  useEffect(() => {
    getPostCard(postID);
  }, [likeData]);

  return <p>{postCard.likes?.length} :like</p>;
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(React.memo(LikeCount));
