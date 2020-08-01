import React, { useState } from "react";
import { bindActionCreators, Dispatch } from "redux";
import { connect } from "react-redux";

import * as authActions from "../../../store/auth/actions";

import style from "./style.module.scss";
import classnames from "classnames";
import Input from "../../FormElements";
import { IRootState, IRootAction } from "../../../store/rootReducer";
import { checkLogin, checkLengthInput } from "../../../services/validation";

const mapStateToProps = (state: IRootState) => ({
  error: state.auth.authData.error,
});

const mapDispatchToProps = (dispatch: Dispatch<IRootAction>) =>
  bindActionCreators(
    {
      deleteError: authActions.deleteError,
      regUser: authActions.regUser.request,
    },
    dispatch
  );

type AuthProps = ReturnType<typeof mapStateToProps> &
  ReturnType<typeof mapDispatchToProps>;

const Registration: React.FC<AuthProps> = ({ deleteError, regUser, error }) => {
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");

  const minPassLength = 5;

  React.useEffect(() => {
    return () => {
      deleteError();
    };
  }, []);

  const loginHandler = (e: React.FormEvent<HTMLInputElement>) => {
    setLogin(e.currentTarget.value);
    checkLogin("login", e.currentTarget.value);
  };

  const passwordHandler = (e: React.FormEvent<HTMLInputElement>) => {
    setPassword(e.currentTarget.value);
    checkLengthInput(
      e.currentTarget.value,
      "password",
      minPassLength,
      0,
      setPassword
    );
  };

  const submitHandler = (e: React.FormEvent<Element>) => {
    e.preventDefault();
    const errors = [];
    errors.push(checkLogin("login", login));
    errors.push(
      checkLengthInput(password, "password", minPassLength, 0, setPassword)
    );
    if (errors.indexOf(false) === -1) regUser({ login, password });
  };

  return (
    <div className={classnames("row container", style.wrapper)}>
      <h1 className="center-align">Registration</h1>
      <form className="col s6 offset-s3" onSubmit={submitHandler}>
        <Input
          id="login"
          type="text"
          labelText="Login"
          value={login}
          onChangeHandler={loginHandler}
          dataError="Please write login"
        />
        <Input
          id="password"
          type="password"
          labelText="Password"
          value={password}
          onChangeHandler={passwordHandler}
          dataError={"Not a character of " + minPassLength + " characters"}
        />
        {error && <div className="card-panel red lighten-3">{error}</div>}
        <button
          className="btn waves-effect waves-light"
          type="submit"
          name="action"
        >
          Submit
          <i className="material-icons right">send</i>
        </button>
      </form>
    </div>
  );
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(React.memo(Registration));
