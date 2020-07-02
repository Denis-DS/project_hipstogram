import { RefObject } from "react";
import * as actions from "./actions";
import { ActionType } from "typesafe-actions";

export type AddAdvAction = ActionType<typeof actions>;

export interface IAdv {
  _id: string | null;
  title: string;
  refPhotos:
    | RefObject<HTMLFormElement | HTMLInputElement>[]
    | undefined[]
    | null[];
  oldImages: IImages[] | null;
}

interface IImages {
  url: string;
  _id: string;
}
