import React, { useState, useRef, useEffect } from "react";
import Input from "../FormElements/index";
import * as actionsAddAdv from "../../store/addPost/actions";
import * as actionsAdv from "../../store/post/actions";
import { Dispatch, bindActionCreators } from "redux";
import { IRootAction, IRootState } from "../../store/rootReducer";
import { connect } from "react-redux";
import Photo from "./Photo";
import style from "./style.module.scss";
import { checkLengthInput } from "../../services/validation";
import { RouteComponentProps } from "react-router-dom";

const mapDispatchToProps = (dispatch: Dispatch<IRootAction>) =>
  bindActionCreators(
    {
      addPost: actionsAddAdv.addPost.request,
      getPostCard: actionsAdv.getPostCard.request,
      deletePostCard: actionsAdv.deletePostCard,
    },
    dispatch
  );

const mapStateToProps = (state: IRootState) => ({
  advData: state.postCard.postCardData,
});

type TParams = { id: string };
type IProps = ReturnType<typeof mapDispatchToProps> &
  ReturnType<typeof mapStateToProps> &
  RouteComponentProps<TParams>;

const AddPost = (props: IProps) => {
  const [title, setTitle] = useState("");

  const refPhoto1 = useRef<HTMLFormElement | null>(null);

  const minTitleLength = 0;
  const maxTitleLength = 70;

  useEffect(() => {
    const textNeedCount = document.querySelectorAll("#title");
    M.CharacterCounter.init(textNeedCount);
    props.match.params.id && props.getPostCard(props.match.params.id); // если редактирование то подгружаем данные по объяве
    return () => {
      props.deletePostCard();
    };
  }, []);

  useEffect(() => {
    setTitle(props.advData.title);
  }, [props.advData]);

  useEffect(() => {
    !props.match.params.id && props.deletePostCard(); // удаляем стейт если с редактирования уходим в создание
  }, [props.match.params.id]);

  const submitHandler = (e: React.FormEvent<Element>) => {
    console.log("push");
    const refPhotos = [refPhoto1];
    const errors = [];
    errors.push(
      checkLengthInput(title, "title", minTitleLength, maxTitleLength, setTitle)
    );

    if (errors.indexOf(false) === -1) {
      const oldImages = props.advData.images ? props.advData.images : null;
      const _id = props.advData._id ? props.advData._id : null;
      props.addPost({
        title,
        refPhotos,
        oldImages,
        _id,
      });
    }
    e.preventDefault();
  };

  const titleHandler = (e: React.FormEvent<HTMLInputElement>) => {
    checkLengthInput(
      e.currentTarget.value,
      "title",
      minTitleLength,
      maxTitleLength,
      setTitle
    );
  };

  return (
    <div className="row">
      <h1 className="center-align">Post advert</h1>
      <div className={style.photoWrapper}>
        <Photo
          id="photo1"
          refPhoto={refPhoto1}
          src={props.advData.images[0]?.url || ""}
        />
      </div>
      <form className="col s12 m6 offset-m3" onSubmit={submitHandler}>
        <Input
          id="title"
          type="text"
          labelText="Title"
          value={title}
          onChangeHandler={titleHandler}
          maxLength={maxTitleLength}
          dataError={"Must be at last " + minTitleLength + " characters"}
        />
        <button
          className="btn waves-effect waves-light"
          type="submit"
          name="action"
        >
          Add
          <i className="material-icons right">send</i>
        </button>
      </form>
    </div>
  );
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(React.memo(AddPost));
