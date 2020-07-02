import React from "react";
import { connect } from "react-redux";
import { bindActionCreators, Dispatch } from "redux";
import M from "materialize-css";

import style from "./style.module.scss";
import { Link } from "react-router-dom";
import { IRootState, IRootAction } from "../../store/rootReducer";
import * as authActions from "../../store/auth/actions";
import classnames from "classnames";
import DropdownMenu from "./DropdownMenu/";
import RightAuthMenu from "./RightAuthMenu";

const mapStateToProps = (state: IRootState) => ({
  authToken: state.auth.authData.authToken,
  nick: state.auth.authData.login,
});

const mapDispatchToProps = (dispatch: Dispatch<IRootAction>) =>
  bindActionCreators(
    {
      unAuthUser: authActions.unAuthUser,
    },
    dispatch
  );

type IProps = ReturnType<typeof mapStateToProps> &
  ReturnType<typeof mapDispatchToProps>;

const Header: React.FC<IProps> = (props) => {
  React.useEffect(() => {
    let dropdowns = document.querySelectorAll(".dropdown-trigger");
    M.Dropdown.init(dropdowns, {});
  }, [props.authToken]);

  document.addEventListener("DOMContentLoaded", function (e) {
    let elems = document.querySelectorAll(".sidenav");
    M.Sidenav.init(elems);
  });

  return (
    <React.Fragment>
      <nav className={classnames("white", style.NavWrapper)}>
        <div className={classnames("container", style.h100)}>
          <div className="nav-wrapper">
            <Link className="left brand-logo black-text" to="/">
              Hipstogram
            </Link>
            <a
              href="!#"
              data-target="mobile-demo"
              className="sidenav-trigger right hide-on-med-and-up black-text"
            >
              <i className="material-icons">menu</i>
            </a>
            <ul className="right">
              <li className="hide-on-small-and-down">
                <RightAuthMenu authToken={props.authToken} nick={props.nick} />
              </li>
            </ul>
          </div>
        </div>
      </nav>
      <ul
        id="dropdown1"
        className={classnames(
          style.dropdownPosition,
          "dropdown-content black-text"
        )}
      >
        <DropdownMenu
          isMobile={false}
          unAuthUser={props.unAuthUser}
          authToken={props.authToken}
        />
      </ul>
      <ul className="sidenav" id="mobile-demo">
        <DropdownMenu
          isMobile={true}
          unAuthUser={props.unAuthUser}
          authToken={props.authToken}
        />
      </ul>
    </React.Fragment>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(React.memo(Header));
