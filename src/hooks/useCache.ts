import { Dispatch, useEffect, useReducer } from "react";
import useLocalStorageState, { LocalState } from "./useLocalStorageState";

type CacheActionType = "CLEAR" | "OVERRIDE" | "REMOVE";
type CacheAction<T> = {
  type: CacheActionType;
  key?: string | number;
  data?: T;
};
export type DispatchCacheAction<T> = Dispatch<CacheAction<T>>;

const cacheReducer = <T>(cache: LocalState<T>, action: CacheAction<T>) => {
  const { type, key, data } = action;

  if (type === "CLEAR") {
    return {};
  }

  if (type === "OVERRIDE") {
    if (!data || !key) {
      return cache;
    }
    return { ...cache, [key]: data };
  }

  if (type === "REMOVE" && key) {
    if (!cache[key]) {
      return cache;
    }
    const newCache = { ...cache };
    delete newCache[key];

    return newCache;
  }

  throw new Error(`Unhandled action type: ${type} in useCache`);
};

const useCache = <T>(
  localStorageKey: string,
  deserialize?: (cached: string) => LocalState<T>
) => {
  const [localData, setLocalData] = useLocalStorageState<T>(
    localStorageKey,
    deserialize
  );
  const [cache, dispatch] = useReducer(cacheReducer<T>, localData);

  useEffect(() => setLocalData(cache), [cache, setLocalData]);

  return { cache, dispatch };
};

export default useCache;
