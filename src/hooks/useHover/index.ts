import { RefObject, useState } from "react";
import useEventListener from "../useEventListener";

const useHover = (ref: RefObject<EventTarget>) => {
  const [hovered, setHovered] = useState(false);

  useEventListener("mouseover", () => setHovered(true), ref.current as Element);
  useEventListener("mouseout", () => setHovered(false), ref.current as Element);

  return hovered;
};

export default useHover;
