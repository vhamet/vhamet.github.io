import { Dispatch, useCallback, useLayoutEffect, useRef } from "react";
import { AsyncAction } from "./useSafeAsync";

const useSafeDispatch = <T>(
  unsafeDispatchFunction: Dispatch<AsyncAction<T>>
) => {
  const isMountedRef = useRef(false);

  useLayoutEffect(() => {
    isMountedRef.current = true;

    return () => {
      isMountedRef.current = false;
    };
  }, []);

  return useCallback(
    (args: AsyncAction<T>) =>
      isMountedRef.current ? unsafeDispatchFunction(args) : void 0,
    [unsafeDispatchFunction]
  );
};

export default useSafeDispatch;
