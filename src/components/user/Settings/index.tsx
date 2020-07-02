import React, { useState, useEffect } from "react";
import classnames from "classnames";
import { bindActionCreators, Dispatch } from "redux";
import { IRootAction, IRootState } from "../../../store/rootReducer";
import * as profileActions from "../../../store/profile/actions";
import { checkLengthInput, checkLogin } from "../../../services/validation";
import style from "./style.module.scss";
import Input from "../../FormElements";
import { connect } from "react-redux";
import Avatar from "../Avatar";

const mapDispatchToProps = (dispatch: Dispatch<IRootAction>) =>
  bindActionCreators(
    {
      getProfile: profileActions.getProfile.request,
      setProfile: profileActions.setProfile.request,
      deleteSuccess: profileActions.deleteSuccess,
    },
    dispatch
  );

const mapStateToProps = (state: IRootState) => ({
  id: state.profile.profileData._id,
  login: state.profile.profileData.login,
  nick: state.profile.profileData.nick,
  errorServer: state.profile.profileData.error,
  success: state.profile.profileData.success,
});

type IProps = ReturnType<typeof mapDispatchToProps> &
  ReturnType<typeof mapStateToProps>;

const Settings: React.FC<IProps> = (props: IProps) => {
  const [login, setLogin] = useState("");
  const [nick, setNick] = useState("");

  useEffect(() => {
    const textNeedCount = document.querySelectorAll("#nick");
    M.CharacterCounter.init(textNeedCount);
  }, []);

  useEffect(() => {
    props.getProfile({ idUser: null });
    if (!props.id) {
      props.getProfile({ idUser: null });
    } else {
      setLogin(props.login);
      setNick(props.nick ? props.nick : "");
    }

    if (props.success) {
      M.toast({ html: props.success, classes: "green" });
      props.deleteSuccess();
    }
  }, [props]);

  const minNickLength = 3;
  const maxNickLength = 20;

  const submitHandler = (e: React.FormEvent<Element>) => {
    const errors = [];
    errors.push(checkLogin("login", login));
    errors.push(
      checkLengthInput(nick, "nick", minNickLength, maxNickLength, setNick)
    );

    if (errors.indexOf(false) === -1) props.setProfile({ login, nick });
    e.preventDefault();
    e.preventDefault();
  };

  const loginHandler = (e: React.FormEvent<HTMLInputElement>) => {
    setLogin(e.currentTarget.value);
    checkLogin("login", e.currentTarget.value);
  };

  const nickHandler = (e: React.FormEvent<HTMLInputElement>) => {
    checkLengthInput(
      e.currentTarget.value,
      "nick",
      minNickLength,
      maxNickLength,
      setNick
    );
  };

  return (
    <div className={classnames("row", style.wrapper)}>
      <h1 className="center-align">Профиль</h1>
      <Avatar />
      <form className="col s12 m6 offset-m3" onSubmit={submitHandler}>
        <Input
          id="login"
          type="text"
          labelText="Login"
          value={login}
          onChangeHandler={loginHandler}
          dataError={"Login new"}
        />
        <Input
          id="nick"
          type="text"
          labelText="Nick"
          value={nick}
          onChangeHandler={nickHandler}
          maxLength={maxNickLength}
          dataError={"No less " + minNickLength + " characters"}
        />

        {props.errorServer && (
          <div className="card-panel red lighten-3">{props.errorServer}</div>
        )}
        <button
          className="btn waves-effect waves-light"
          type="submit"
          name="action"
        >
          Edit
          <i className="material-icons right">send</i>
        </button>
      </form>
    </div>
  );
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(React.memo(Settings));
