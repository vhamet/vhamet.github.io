import { useState } from "react";

const useArray = <T>(defaultValue: T[]) => {
  const [array, setArray] = useState(defaultValue);

  const push = (element: T) => {
    setArray((a) => [...a, element]);
  };

  const filter = (callback: (element: T) => boolean) => {
    setArray((a) => a.filter(callback));
  };

  const update = (index: number, newElement: T) => {
    setArray((a) => [
      ...a.slice(0, index),
      newElement,
      ...a.slice(index + 1, a.length),
    ]);
  };

  const remove = (index: number) => {
    setArray((a) => [...a.slice(0, index), ...a.slice(index + 1, a.length)]);
  };

  const clear = () => {
    setArray([]);
  };

  return { array, set: setArray, push, filter, update, remove, clear };
};

export default useArray;
