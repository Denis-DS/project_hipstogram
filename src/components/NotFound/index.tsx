import React from "react";
import style from "./style.module.scss";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";

const NotFound = () => {
  return (
    <div className={style.notFoundWrapper}>
      <Helmet>
        <title>Фиаско Братан - Success</title>
        <meta name="description" content="Не унывай, пробуй еще" />
      </Helmet>
      <div className="row">
        <div className="col s12 m6 offset-m3">
          <div className="card blue-grey darken-1">
            <div className="card-content white-text">
              <span className="center-align card-title">404</span>
            </div>
            <div className="card-action center-align">
              <Link to="/">Go to start</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default React.memo(NotFound);
