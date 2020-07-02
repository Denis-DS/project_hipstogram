import React, { useState, useEffect, useRef } from "react";
import { Dispatch, bindActionCreators } from "redux";
import { IRootAction, IRootState } from "../../../store/rootReducer";
import * as actions from "../../../store/message/actions";
import style from "./style.module.scss";
import { connect } from "react-redux";
import Photo from "../../AddPost/Photo";

interface IParentProps {
  nick: string;
  userId: string;
}

const mapStateToProps = (state: IRootState) => ({
  success: state.message.success,
  failure: state.message.failure,
});

const mapDispatchToProps = (dispatch: Dispatch<IRootAction>) =>
  bindActionCreators(
    {
      setMessage: actions.setMessage.request,
      deleteToastMessage: actions.deleteToastMessage,
    },
    dispatch
  );

type IProps = ReturnType<typeof mapDispatchToProps> &
  ReturnType<typeof mapStateToProps> &
  IParentProps;

const AddMessage = (props: IProps) => {
  useEffect(() => {
    props.success && M.toast({ html: props.success, classes: "green" });
    props.failure && M.toast({ html: props.failure, classes: "red" });
    props.deleteToastMessage();
  }, [props.success, props.failure]);

  const [text, setText] = useState("");

  const refPhoto = useRef<HTMLFormElement | null>(null);

  const sendMessageHandler = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    props.setMessage({ userId: props.userId, text, refPhoto });
    setText("");
  };

  const changeTextHandler = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setText(e.currentTarget.value);
  };

  return (
    <div id="modal1" className="modal modal-fixed-footer">
      <div className="modal-content">
        <h4 className={style.header}>Write message{props.nick}</h4>
        <div className={style.photoWrapper}>
          <Photo
            id="photo1"
            refPhoto={refPhoto}
            src="https://brilliant24.ru/files/cat/bg_template_01.png"
          />
        </div>
        <textarea
          className={style.messageInput}
          value={text}
          onChange={changeTextHandler}
        />
      </div>
      <div className="modal-footer">
        <button className="modal-close waves-green btn-flat">Cancel</button>
        <button
          disabled={text.trim() ? false : true}
          className="modal-close waves-effect waves-green btn"
          onClick={sendMessageHandler}
        >
          Direct
        </button>
      </div>
    </div>
  );
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(React.memo(AddMessage));
