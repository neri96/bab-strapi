import { Dispatch, SetStateAction } from "react";

export interface IValue {
  value: any;
  setValue: Dispatch<SetStateAction<any>>;
}
