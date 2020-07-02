import React, { useState, RefObject, useEffect } from "react";
import style from "./style.module.scss";
import { checkPhoto } from "../../../services/validation";

interface IProps {
  id: string;
  refPhoto: RefObject<HTMLFormElement> | undefined | null;
  src: string;
}

const Photo = (props: IProps) => {
  const [imageUrl, setImageUrl] = useState<string>(
    "https://brilliant24.ru/files/cat/bg_template_01.png"
  );

  useEffect(() => {
    props.src && setImageUrl(props.src);
  }, [props.src]);

  useEffect(() => {
    const elems = document.querySelectorAll(".modal");
    M.Modal.init(elems, {});
  }, []);

  const uploadHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (e.currentTarget.files) {
      let file = e.currentTarget.files[0];
      let reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        if (
          reader.result &&
          typeof reader.result === "string" &&
          checkPhoto(reader.result)
        ) {
          setImageUrl(reader.result);
        } else {
          props.refPhoto?.current?.reset();
          const elem: any = document.getElementById("modal1");
          const instance = M.Modal.getInstance(elem);
          instance.open();
        }
      };
    }
  };

  return (
    <div className={style.logoWrapper}>
      <img className={style.avatar} src={imageUrl} alt="addphoto" />
      <div className={style.inputFileWrapper}>
        <form
          action="/upload"
          encType="multipart/form-data"
          method="post"
          ref={props.refPhoto}
        >
          <input
            accept="image/jpg,image/jpeg,image/png,image/gif"
            onChange={uploadHandler}
            type="file"
            name="photo"
            id={props.id}
            className={style.inputFile}
          />
          <label htmlFor={props.id}>
            <i className="material-icons">add</i>
          </label>
        </form>
      </div>
      <div id="modal1" className="modal">
        <div className="modal-content">
          <p>Photo format is invalid. You can use: jpeg, jpg, png, gif</p>
        </div>
        <div className="modal-footer">
          <a
            href="#!"
            className="modal-close waves-effect waves-green btn-flat"
          >
            Ok
          </a>
        </div>
      </div>
    </div>
  );
};

export default React.memo(Photo);
