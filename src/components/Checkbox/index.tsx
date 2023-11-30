import { InputHTMLAttributes } from "react";
import "./Checkbox.scss";

interface CheckboxProps extends InputHTMLAttributes<HTMLInputElement> {
  checked: boolean;
  onChange: () => void;
  htmlFor?: string;
}

const Checkbox = ({
  onChange,
  checked,
  htmlFor,
  disabled,
  className,
  ...props
}: CheckboxProps) => {
  return (
    <div
      {...props}
      className={`checkbox ${className}${disabled ? " disabled" : ""}`}
      onClick={disabled ? undefined : onChange}
    >
      <div className="checkbox__box">{checked && <label>✓</label>}</div>
      {htmlFor && <label className="checkbox__label">{htmlFor}</label>}
    </div>
  );
};

export default Checkbox;
