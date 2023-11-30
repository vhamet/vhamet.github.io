import { useEffect } from "react";

const useEffectOnce = (cb: () => void) => {
  useEffect(cb, []);
};

export default useEffectOnce;
