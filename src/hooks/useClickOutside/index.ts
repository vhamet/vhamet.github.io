import { RefObject } from "react";
import useEventListener from "../useEventListener";

const useClickOutside = <T extends HTMLElement = HTMLElement>(
  ref: RefObject<T>,
  cb: (event: Event) => void
) => {
  useEventListener(
    "click",
    (event) => {
      if (ref.current == null || ref.current.contains(event.target as T))
        return;
      cb(event);
    },
    window
  );
};

export default useClickOutside;
