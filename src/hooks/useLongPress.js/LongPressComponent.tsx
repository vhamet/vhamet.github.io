import { useRef } from "react";
import useLongPress from ".";

const LongPressComponent = () => {
  const elementRef = useRef(null);
  useLongPress(elementRef, () => alert("Long Press"));

  return (
    <div
      ref={elementRef}
      style={{
        backgroundColor: "red",
        width: "100px",
        height: "100px",
        position: "absolute",
        top: "calc(50% - 50px)",
        left: "calc(50% - 50px)",
      }}
    />
  );
};

export default LongPressComponent;
