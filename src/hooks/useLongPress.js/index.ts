import { RefObject } from "react";

import useEventListener from "../useEventListener";
import useTimeout from "../useTimeout";
import useEffectOnce from "../useEffectOnce";

const useLongPress = (
  ref: RefObject<EventTarget>,
  cb: () => void,
  { delay = 250 } = {}
) => {
  const { reset, clear } = useTimeout(cb, delay);
  useEffectOnce(clear);

  useEventListener("mousedown", reset, ref.current as Element);
  useEventListener("touchstart", reset, ref.current as Element);

  useEventListener("mouseup", clear, ref.current as Element);
  useEventListener("mouseleave", clear, ref.current as Element);
  useEventListener("touchend", clear, ref.current as Element);
};

export default useLongPress;
