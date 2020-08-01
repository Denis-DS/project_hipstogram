import React from "react";
import { Link } from "react-router-dom";
import style from "./style.module.scss";

interface IProps {
  unAuthUser: () => void;
  isMobile: boolean;
  authToken: string | null;
}

const DropdownMenu = (props: IProps) => {
  const closeMenuHandler = () => {
    if (props.isMobile) {
      const elem: HTMLElement | null = document.getElementById("mobile-demo");
      if (elem) {
        const instance = M.Sidenav.init(elem, { edge: "right" });
        instance.close();
      }
    }
  };

  return props.authToken ? (
    <React.Fragment>
      <li onClick={closeMenuHandler}>
        <Link to="/settings" className="indigo-text accent-4">
          Settings
        </Link>
      </li>
      <li onClick={closeMenuHandler}>
        <Link to="/direct" className="indigo-text accent-4">
          Direct
        </Link>
      </li>
      <li onClick={closeMenuHandler}>
        <Link
          to="/login"
          className="indigo-text accent-4"
          onClick={() => props.unAuthUser()}
        >
          Log out
        </Link>
      </li>
      {props.isMobile && (
        <li className={style.close} onClick={closeMenuHandler}>
          Close
        </li>
      )}
    </React.Fragment>
  ) : (
    <React.Fragment>
      <li onClick={closeMenuHandler}>
        <Link to="/login" className="indigo-text accent-4">
          Log in
        </Link>
      </li>
      <li onClick={closeMenuHandler}>
        <Link to="/singin" className="indigo-text accent-4">
          Registration
        </Link>
      </li>
      {props.isMobile && (
        <li className={style.close} onClick={closeMenuHandler}>
          Close
        </li>
      )}
    </React.Fragment>
  );
};

export default React.memo(DropdownMenu);
