import React, { useState } from "react";
import { bindActionCreators, Dispatch } from "redux";
import { connect } from "react-redux";
import * as authActions from "../../../store/auth/actions";
import style from "./style.module.scss";
import classnames from "classnames";
import Input from "../../FormElements";
import { IRootState, IRootAction } from "../../../store/rootReducer";
import { checkLogin } from "../../../services/validation";

const mapStateToProps = (state: IRootState) => ({
  error: state.auth.authData.error,
});

const mapDispatchToProps = (dispatch: Dispatch<IRootAction>) =>
  bindActionCreators(
    {
      authUser: authActions.authUser.request,
      deleteError: authActions.deleteError,
    },
    dispatch
  );

type AuthProps = ReturnType<typeof mapStateToProps> &
  ReturnType<typeof mapDispatchToProps>;

const Authorization: React.FC<AuthProps> = (props) => {
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");

  const minPassLength = 5;

  React.useEffect(() => {
    return () => {
      props.deleteError();
    };
  }, []);

  const loginHandler = (e: React.FormEvent<HTMLInputElement>) => {
    setLogin(e.currentTarget.value);
    checkLogin("login", e.currentTarget.value);
  };

  const passwordHandler = (e: React.FormEvent<HTMLInputElement>) => {
    setPassword(e.currentTarget.value);
  };

  const submitHandler = (e: React.FormEvent<Element>) => {
    checkLogin("login", login) && props.authUser({ login, password });
    e.preventDefault();
  };

  return (
    <div className={classnames("row container", style.wrapper)}>
      <h1 className="center-align">Authorization</h1>
      <form className="col s6 offset-s3" onSubmit={submitHandler}>
        <Input
          id="login"
          type="text"
          labelText="Email"
          value={login}
          onChangeHandler={loginHandler}
          dataError="Email should be like this: email@email.com"
        />
        <Input
          id="password"
          type="password"
          labelText="Password"
          value={password}
          onChangeHandler={passwordHandler}
          dataError={"Not a character of " + minPassLength + " characters"}
        />
        {props.error && (
          <div className="card-panel red lighten-3">{props.error}</div>
        )}
        <button
          className="btn waves-effect waves-light "
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
)(React.memo(Authorization));
