import React, { FC } from "react";
import { FieldError, Merge, FieldErrorsImpl } from "react-hook-form";

type TFormErrorProps = {
  children?:
  | string
  | FieldError
  | Merge<FieldError, FieldErrorsImpl<any>>
  | undefined;
};
const FormErr: FC<TFormErrorProps> = ({ children }) => {
  return (
    <p className="text-red-500 text-xs">{children ? String(children) : ""}</p>
  );
};

export default FormErr;
