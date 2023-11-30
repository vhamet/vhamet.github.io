import { useEffect } from "react";
import useTimeout from "../useTimeout";

const useDebounce = (
  callback: () => void,
  delay: number,
  dependencies: unknown[]
) => {
  const { reset, clear } = useTimeout(callback, delay);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(reset, dependencies);
  useEffect(clear, [clear]);
};

export default useDebounce;
