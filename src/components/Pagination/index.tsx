import React from "react";
import { Link } from "react-router-dom";
import style from "./style.module.scss";

interface IProps {
  pagesCount: number;
  currentPage: number;
  path: string;
}

const Pagination = (props: IProps) => {
  window.scrollTo(0, 0);

  const pagination = [];
  if (props.pagesCount > 2) {
    props.currentPage > 5 && pagination.push(<li key="1">...</li>);
    for (let i = props.currentPage - 3; i <= props.currentPage + 3; i++) {
      if (i > 1 && i < props.pagesCount) {
        pagination.push(
          <li
            key={i}
            className={i === props.currentPage ? "active" : style.pageHover}
          >
            <Link to={`${props.path}/page-${i}`}>{i}</Link>
          </li>
        );
      }
    }
    props.currentPage + 5 <= props.pagesCount &&
      pagination.push(<li key={props.pagesCount}>...</li>);
  }
  return (
    <ul className="pagination center-align">
      <li
        className={props.currentPage === 1 ? style.disabled : style.pageHover}
      >
        {props.currentPage > 1 ? (
          <Link to={`${props.path}/page-${props.currentPage - 1}`}>
            <i className="material-icons">chevron_left</i>
          </Link>
        ) : (
          <i className="material-icons">chevron_left</i>
        )}
      </li>
      <li className={props.currentPage === 1 ? "active" : style.pageHover}>
        <Link to={`${props.path}/page-1`}>1</Link>
      </li>
      {pagination}
      {props.pagesCount > 1 && (
        <li
          className={
            props.currentPage === props.pagesCount ? "active" : style.pageHover
          }
        >
          <Link to={`${props.path}/page-${props.pagesCount}`}>
            {props.pagesCount}
          </Link>
        </li>
      )}
      <li
        className={
          props.currentPage >= props.pagesCount
            ? style.disabled
            : style.pageHover
        }
      >
        {props.currentPage < props.pagesCount ? (
          <Link to={`${props.path}/page-${props.currentPage + 1}`}>
            <i className="material-icons">chevron_right</i>
          </Link>
        ) : (
          <i className="material-icons">chevron_right</i>
        )}
      </li>
    </ul>
  );
};

export default React.memo(Pagination);
