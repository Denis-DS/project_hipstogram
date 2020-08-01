import React from "react";
import { Link } from "react-router-dom";
import style from "./style.module.scss";
import classnames from "classnames";

interface IProps {
  authToken: string | null;
  login: string | null;
}

const RightAuthMenu = (props: IProps) => {
  return props.authToken ? (
    <a
      className="dropdown-trigger black-text"
      href="#!"
      data-target="dropdown1"
    >
      <span className={classnames("truncate left", style.login)}>
        {props.login}
      </span>
      <i className="material-icons right">arrow_drop_down</i>
    </a>
  ) : (
    <div className={style.logIn}>
      <Link to="/registration" className="black-text accent-4">
        Registration
      </Link>
      <span>|</span>
      <Link to="/login" className="black-text accent-4">
        Log in
      </Link>
    </div>
  );
};

export default React.memo(RightAuthMenu);
