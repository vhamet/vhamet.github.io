import { ReactNode, TextareaHTMLAttributes, forwardRef } from "react";

import "./Textarea.scss";

type TextareaProps = TextareaHTMLAttributes<HTMLTextAreaElement> & {
  classnames?: string;
  label?: ReactNode;
};

const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ classnames, label, ...props }: TextareaProps, ref) => (
    <div className="textarea">
      {label && <label>{label}</label>}
      <textarea
        ref={ref}
        className={`textarea__textarea ${classnames}`}
        {...props}
      />
    </div>
  )
);

export default Textarea;
