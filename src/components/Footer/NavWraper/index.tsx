import React from "react";
import { Link } from "react-router-dom";
import style from "./style.module.scss";

interface IProps {
  authToken: string | null;
  login: string | null;
  avatar: string | undefined;
  id: string | null;
}

const RightAuthMenu = (props: IProps) => {
  return props.authToken ? (
    <div className={style.navWraper}>
      <ul className={style.navBar}>
        <li>
          <Link to="/" id="house">
            <span className="material-icons black-text">house</span>
          </Link>
        </li>
        <li>
          <Link to="/posts">
            <span className="material-icons black-text">search</span>
          </Link>
        </li>
        <li>
          <Link to="/addpost">
            <span className="material-icons black-text">add</span>
          </Link>
        </li>
        <li>
          <Link to="/likes">
            <span className="material-icons black-text">favorite_border</span>
          </Link>
        </li>
        <li>
          <Link to={`/profile/${props.id}`}>
            {props.avatar ? (
              <img
                src={`/${props.avatar}`}
                alt="photoUser"
                className={style.PhotoUser}
              />
            ) : (
              <span className="large material-icons black-text">face</span>
            )}
          </Link>
        </li>
      </ul>
    </div>
  ) : (
    <div className={style.navWraper}>
      <ul className={style.navBar}>
        <li>
          <a className="right black-text text-lighten-4 " href="#!">
            © 2020 Hipstogram
          </a>
        </li>
        <li>
          <a className="right black-text text-lighten-4 mobile" href="#!">
            hipstagram@gmail.com
          </a>
        </li>
      </ul>
    </div>
  );
};

export default React.memo(RightAuthMenu);
