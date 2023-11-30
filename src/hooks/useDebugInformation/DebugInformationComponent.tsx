import { useState } from "react";

import useDebugInformation from ".";
import useToggle from "../useToggle";

const DebugInformationComponent = () => {
  const [boolean, toggle] = useToggle(false);
  const [count, setCount] = useState(0);

  return (
    <>
      <ChildComponent boolean={boolean} count={count} />
      <button onClick={() => toggle()}>Toggle</button>
      <button onClick={() => setCount((prevCount) => prevCount + 1)}>
        Increment
      </button>
    </>
  );
};

const ChildComponent = (props: { boolean: boolean; count: number }) => {
  const info = useDebugInformation("ChildComponent", props);

  return (
    <>
      <div>{props.boolean.toString()}</div>
      <div>{props.count}</div>
      <div>{JSON.stringify(info, null, 2)}</div>
    </>
  );
};

export default DebugInformationComponent;
