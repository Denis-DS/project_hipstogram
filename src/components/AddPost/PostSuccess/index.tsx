import React from "react";
import style from "./style.module.scss";
import { Link } from "react-router-dom";

const AdvSuccess = () => {
  return (
    <div className={style.wrapper}>
      <div className="row">
        <div className="col s12 m10 offset-m1">
          <h1>Ad posted successfully</h1>
          <p>You can post one more ad</p>
          <Link to="/addpost" className="waves-effect waves-light btn">
            <i className="material-icons left">add</i>Advert
          </Link>
        </div>
      </div>
    </div>
  );
};

export default React.memo(AdvSuccess);
