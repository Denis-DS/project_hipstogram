import React, { useEffect } from "react";
import { connect } from "react-redux";
import { bindActionCreators, Dispatch } from "redux";
import style from "./style.module.scss";
import { IRootState, IRootAction } from "../../store/rootReducer";
import * as authActions from "../../store/auth/actions";
import * as profileActions from "../../store/user/actions";
import NavWraper from "./NavWraper";

const mapStateToProps = (state: IRootState) => ({
  authToken: state.auth.authData.authToken,
  login: state.auth.authData.login,
  loginUser: state.profile.profileData.login,
  avatarUser: state.profile.profileData.avatar?.url,
  avatar: state.user.profileData.avatar?.url,
  id: state.user.profileData._id,
  _id: state.auth.authData.id,
});

const mapDispatchToProps = (dispatch: Dispatch<IRootAction>) =>
  bindActionCreators(
    {
      getUser: profileActions.getUser.request,
      unAuthUser: authActions.unAuthUser,
    },
    dispatch
  );

type IProps = ReturnType<typeof mapDispatchToProps> &
  ReturnType<typeof mapStateToProps>;

const Footer: React.FC<IProps> = ({
  loginUser,
  avatarUser,
  authToken,
  login,
  avatar,
  _id,
  getUser,
}: IProps) => {
  useEffect(() => {
    getUser();
  }, [loginUser, avatarUser]);

  return (
    <footer className={style.footer}>
      <NavWraper authToken={authToken} login={login} avatar={avatar} id={_id} />
    </footer>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(React.memo(Footer));
