import { useState } from "react";
import copy from "copy-to-clipboard";

type CopyToClipboardOptions = {
  debug: boolean;
  message: string;
  format: string;
  onCopy: (clipboardData: object) => void;
};

const useCopyToClipboard = (): [
  (text: string, options?: CopyToClipboardOptions) => void,
  { value: string; success: boolean }
] => {
  const [value, setValue] = useState<string>("");
  const [success, setSuccess] = useState<boolean>(false);

  const copyToClipboard = (text: string, options?: CopyToClipboardOptions) => {
    const result = copy(text, options);
    if (result) setValue(text);
    setSuccess(result);
  };

  return [copyToClipboard, { value, success }];
};

export default useCopyToClipboard;
