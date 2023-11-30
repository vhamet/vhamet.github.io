import { InputHTMLAttributes, ReactNode, forwardRef } from "react";

import "./Input.scss";

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  classnames?: string;
  label?: ReactNode;
};

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ classnames, label, ...props }: InputProps, ref) => (
    <div className="input">
      {label && <label>{label}</label>}
      <input
        ref={ref}
        className={`input__input ${classnames}`}
        type={props.type || "text"}
        {...props}
      />
    </div>
  )
);

export default Input;
