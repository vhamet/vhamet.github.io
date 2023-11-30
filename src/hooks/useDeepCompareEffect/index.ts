import { useEffect, useRef } from "react";
import isEqual from "lodash/fp/isEqual";

const useDeepCompareEffect = (
  callback: () => void,
  dependencies: unknown[]
) => {
  const currentDependenciesRef = useRef<unknown[]>();

  if (!isEqual(currentDependenciesRef.current, dependencies)) {
    currentDependenciesRef.current = dependencies;
  }

  useEffect(callback, [currentDependenciesRef.current]);
};

export default useDeepCompareEffect;
