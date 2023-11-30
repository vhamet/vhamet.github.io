import { useEffect, useState, useRef, useMemo } from "react";
import useDeepCompareEffect from ".";

const DeepCompareEffectComponent = () => {
  const [age, setAge] = useState(0);
  const [otherCount, setOtherCount] = useState<number>(0);
  const effectCountRef = useRef<HTMLSpanElement>(null);
  const deepCompareEffectCountRef = useRef<HTMLSpanElement>(null);

  const person = useMemo(() => ({ age: age, name: "Kyle" }), [age]);

  useEffect(() => {
    effectCountRef.current!.innerText = `${
      parseInt(effectCountRef.current!.innerText) + 1
    }`;
  }, [person]);

  useDeepCompareEffect(() => {
    deepCompareEffectCountRef.current!.innerText = `${
      parseInt(deepCompareEffectCountRef.current!.innerText) + 1
    }`;
  }, [person]);

  return (
    <div>
      <div>
        useEffect: <span ref={effectCountRef}>0</span>
      </div>
      <div>
        useDeepCompareEffect: <span ref={deepCompareEffectCountRef}>0</span>
      </div>
      <div>Other Count: {otherCount}</div>
      <div>{JSON.stringify(person)}</div>
      <button onClick={() => setAge((currentAge) => currentAge + 1)}>
        Increment Age
      </button>
      <button onClick={() => setOtherCount((count) => count + 1)}>
        Increment Other Count
      </button>
    </div>
  );
};

export default DeepCompareEffectComponent;
