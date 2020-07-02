import React from "react";
import { Link } from "react-router-dom";
import style from "./style.module.scss";
import classnames from "classnames";

interface IProps {
  authToken: string | null;
  nick: string | null;
}

const RightAuthMenu = (props: IProps) => {
  return props.authToken ? (
    <a
      className="dropdown-trigger black-text"
      href="#!"
      data-target="dropdown1"
    >
      <span className={classnames("truncate left", style.nick)}>
        {props.nick}
      </span>
      <i className="material-icons right">arrow_drop_down</i>
    </a>
  ) : (
    <div className={style.logIn}>
      <Link to="/singin" className="indigo-text accent-4">
        Sing in
      </Link>
      <span>|</span>
      <Link to="/login" className="indigo-text accent-4">
        Log in
      </Link>
    </div>
  );
};

export default React.memo(RightAuthMenu);
