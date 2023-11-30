import { ButtonHTMLAttributes, forwardRef } from "react";

import "./Button.scss";

type ButtonStyle = "default" | "error" | "hollow";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  classnames?: string;
  buttonStyle?: ButtonStyle;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ classnames, buttonStyle, children, ...props }: ButtonProps, ref) => (
    <button
      ref={ref}
      className={`button ${buttonStyle || "default"} ${classnames || ""}`}
      {...props}
    >
      {children}
    </button>
  )
);

export default Button;
