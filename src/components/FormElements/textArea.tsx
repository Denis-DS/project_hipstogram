import React from "react";
import classnames from "classnames";
import "./style.scss";

interface IProps {
  id: string;
  labelText: string;
  value: string;
  onChangeHandler: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  dataTooltip?: string;
  maxLength?: number;
  dataError?: string;
}

const InputTypeText = (props: IProps) => {
  return (
    <div className="row">
      <div className="input-field col s12">
        <textarea
          value={props.value}
          onChange={props.onChangeHandler}
          id={props.id}
          className={classnames(
            "materialize-textarea changeTextarea",
            props.dataTooltip ? "tooltipped" : ""
          )}
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
