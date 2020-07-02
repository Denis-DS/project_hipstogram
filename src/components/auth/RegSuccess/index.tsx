import React from "react";
import { Link } from "react-router-dom";

const RegSuccess = () => {
  return (
    <div className="row">
      <div className="col m8 s10 offset-m2 center-align card-panel white">
        <p>Registration completed successfully</p>
        <Link to="/singin">Log in</Link>
      </div>
    </div>
  );
};

export default React.memo(RegSuccess);
