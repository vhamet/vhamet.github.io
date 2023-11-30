import { useState, useCallback, Dispatch } from "react";

const useStateWithValidation = <T>(
  validationFunc: (value: T) => boolean,
  initialValue: T
): [T, Dispatch<React.SetStateAction<T>>, boolean] => {
  const [state, setState] = useState(initialValue);
  const [isValid, setIsValid] = useState(() => validationFunc(state));

  const onChange = useCallback(
    (nextState: T) => {
      const value =
        typeof nextState === "function" ? nextState(state) : nextState;
      setState(value);
      setIsValid(validationFunc(value));
    },
    [validationFunc, state]
  ) as Dispatch<React.SetStateAction<T>>;

  return [state, onChange, isValid];
};

export default useStateWithValidation;
