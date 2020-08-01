import React from "react";
import style from "./style.module.scss";
import { Link } from "react-router-dom";
import { IPosts } from "../../../store/posts/types";

const AdvUser = (props: IPosts) => {
  return (
    <div className={style.PostUser}>
      <div className={style.advWrapper}>
        <div className={style.photoWrapper}>
          <Link to={`/postcard/${props._id}`}>
            <img alt={props.title} src={props.images} />
          </Link>
        </div>
        <div className={style.contentWrapper}>
          <div className={style.content}>
            <Link to={`/postcard/${props._id}`}>
              <h4>{props.title}</h4>
            </Link>
            <span className={style.data}>{props.createdAt}</span>
          </div>
          <div className={style.controlWrapper}>
            <Link
              to={`/postedit-${props._id}`}
              className="waves-effect waves-light btn"
            >
              Edit
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default React.memo(AdvUser);
