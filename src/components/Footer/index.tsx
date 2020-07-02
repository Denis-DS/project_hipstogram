import React, { useEffect } from "react";
import { connect } from "react-redux";
import { bindActionCreators, Dispatch } from "redux";
import style from "./style.module.scss";
import { IRootState, IRootAction } from "../../store/rootReducer";
import * as authActions from "../../store/auth/actions";
import * as profileActions from "../../store/profile/actions";
import NavWraper from "./NavWraper";

const mapStateToProps = (state: IRootState) => ({
  authToken: state.auth.authData.authToken,
  nick: state.auth.authData.login,
  avatar: state.profile.profileData.avatar?.url,
  id: state.profile.profileData._id,
  _id: state.auth.authData.id,
});

const mapDispatchToProps = (dispatch: Dispatch<IRootAction>) =>
  bindActionCreators(
    {
      getProfile: profileActions.getProfile.request,
      unAuthUser: authActions.unAuthUser,
    },
    dispatch
  );

type IProps = ReturnType<typeof mapDispatchToProps> &
  ReturnType<typeof mapStateToProps>;

const Footer: React.FC<IProps> = (props: IProps) => {
  useEffect(() => {
    if (!props.id) {
      props.getProfile({ idUser: props._id });
    }
  }, [props]);

  return (
    <footer className={style.footer}>
      <NavWraper
        authToken={props.authToken}
        nick={props.nick}
        avatar={props.avatar}
        id={props._id}
      />
    </footer>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(React.memo(Footer));
