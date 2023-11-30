import { useState } from "react";
import useEffectOnce from ".";

const EffectOnceComponent = () => {
  const [count, setCount] = useState(0);

  useEffectOnce(() => alert("Hi"));

  return (
    <>
      <div>{count}</div>
      <button onClick={() => setCount((c) => c + 1)}>Increment</button>
    </>
  );
};

export default EffectOnceComponent;
