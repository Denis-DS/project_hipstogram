import React from "react";
import style from "./style.module.scss";
import { Link } from "react-router-dom";
import { IPosts } from "../../../store/posts/types";
import "./ImageBox.scss";

const Post = (props: IPosts) => {
  return (
    <div className={style.PostWraper}>
      <Link to={`/postcard/${props._id}`}>
        <div className="gallery-item">
          <img src={props.images} className="gallery-image" alt={props.title} />
          <div className="gallery-item-info">
            <ul>
              <li className="gallery-item-likes">
                <span className="visually-hidden">
                  <i className="material-icons">favorite_border</i>
                </span>
                {props.likes}
              </li>
              <li className="gallery-item-comments">
                <span className="visually-hidden">
                  <i className="material-icons">mode_comment</i>
                </span>
                {props.comments}
              </li>
            </ul>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default React.memo(Post);
