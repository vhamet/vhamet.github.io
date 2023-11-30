import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";

export type LocalState<T> = { [key: string]: T };
export type DispatchLocalType<T> = Dispatch<SetStateAction<LocalState<T>>>;

const initState = <T>(
  key: string,
  deserialize: (cached: string) => LocalState<T>
) => {
  const state = localStorage.getItem(key);
  if (state) return deserialize(state) as LocalState<T>;

  return {};
};

const useLocalStorageState = <T>(
  key: string,
  deserialize: (cached: string) => LocalState<T> = JSON.parse
) => {
  const [state, setState] = useState<LocalState<T>>(
    initState<T>(key, deserialize)
  );

  const prevKeyRef = useRef(key);
  useEffect(() => {
    const prevKey = prevKeyRef.current;
    if (prevKey !== key) {
      window.localStorage.removeItem(prevKey);
    }
    prevKeyRef.current = key;
    window.localStorage.setItem(key, JSON.stringify(state));
  }, [key, state]);

  return [state, setState] as [LocalState<T>, DispatchLocalType<T>];
};

export default useLocalStorageState;
