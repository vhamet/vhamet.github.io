import { useCallback, useReducer } from "react";
import useSafeDispatch from "./useSafeDispatch";

export enum AsyncStatus {
  "idle",
  "pending",
  "resolved",
  "rejected",
}

export type AsyncAction<T> = {
  type: AsyncStatus;
  data?: T;
  error?: Error;
};

export type AsyncState<T> = {
  status: AsyncStatus;
  data?: T | null;
  error?: Error | null;
};

const asyncReducer = <T>(
  state: AsyncState<T>,
  action: AsyncAction<T>
): AsyncState<T> => {
  switch (action.type) {
    case AsyncStatus.idle: {
      return { ...state, status: AsyncStatus.idle };
    }
    case AsyncStatus.pending: {
      return { status: AsyncStatus.pending, data: null, error: null };
    }
    case AsyncStatus.resolved: {
      return { status: AsyncStatus.resolved, data: action.data, error: null };
    }
    case AsyncStatus.rejected: {
      return { status: AsyncStatus.rejected, data: null, error: action.error };
    }
    default: {
      throw new Error(`Unhandled action type: ${AsyncStatus[action.type]}`);
    }
  }
};

const useSafeAsync = <T>(initialState: AsyncState<T>) => {
  const [state, unsafeDispatch] = useReducer(asyncReducer<T>, {
    data: null,
    error: null,
    ...initialState,
  } as AsyncState<T>);

  const dispatch = useSafeDispatch<T>(unsafeDispatch);

  const { data, error, status } = state;

  const runFunction = useCallback(
    (promise: Promise<T>) => {
      dispatch({ type: AsyncStatus.pending });
      promise.then(
        (data: T) => dispatch({ type: AsyncStatus.resolved, data }),
        (error: Error) => dispatch({ type: AsyncStatus.rejected, error })
      );
    },
    [dispatch]
  );

  const reset = useCallback(
    () => dispatch({ type: AsyncStatus.idle }),
    [dispatch]
  );

  return { error, status, data, runFunction, reset };
};

export default useSafeAsync;
