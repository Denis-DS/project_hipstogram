import React from "react";
import classnames from "classnames";

interface IProps {
  type: string;
  id: string;
  labelText: string;
  value: string;
  onChangeHandler: (e: React.FormEvent<HTMLInputElement>) => void;
  onBlurHandler?: (id: string, phones: string) => void;
  dataTooltip?: string;
  maxLength?: number;
  dataError?: string;
}

const InputTypeText = (props: IProps) => {
  document.addEventListener("DOMContentLoaded", function () {
    let elems = document.querySelectorAll(".tooltipped");
    M.Tooltip.init(elems, {});
  });

  return (
    <div className="row">
      <div className="input-field col s12">
        <input
          value={props.value}
          onChange={props.onChangeHandler}
          onBlur={(e) =>
            props.onBlurHandler &&
            props.onBlurHandler(props.id, e.currentTarget.value)
          }
          id={props.id}
          type={props.type}
          className={classnames(props.dataTooltip ? "tooltipped" : "")}
          data-position="right"
          data-tooltip={props.dataTooltip}
          placeholder=""
          data-length={props.maxLength}
        />
        <label htmlFor={props.id} className="active">
          {props.labelText}
        </label>
        <span
          className="helper-text"
          data-error={props.dataError}
          data-success="Good"
        ></span>
      </div>
    </div>
  );
};

export default React.memo(InputTypeText);
