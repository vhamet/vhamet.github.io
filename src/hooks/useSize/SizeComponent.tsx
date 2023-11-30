import { useRef } from "react";
import useSize from ".";

const SizeComponent = () => {
  const ref = useRef(null);
  const size = useSize(ref);

  return (
    <>
      <div>{JSON.stringify(size)}</div>
      <textarea ref={ref}></textarea>
    </>
  );
};

export default SizeComponent;
