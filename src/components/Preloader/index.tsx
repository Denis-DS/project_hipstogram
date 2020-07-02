import React from "react";
import style from "./style.module.scss";

const Preloader = () => {
  return (
    <div className={style.preloderWrapper}>
      <div className="progress">
        <div className="indeterminate"></div>
      </div>
    </div>
  );
};

export default React.memo(Preloader);
