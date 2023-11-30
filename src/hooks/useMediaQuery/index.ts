import { useState, useEffect } from "react";
import useEventListener from "../useEventListener";

const useMediaQuery = (mediaQuery: string) => {
  const [isMatch, setIsMatch] = useState(false);
  const [mediaQueryList, setMediaQueryList] = useState<MediaQueryList>();

  useEffect(() => {
    const list = window.matchMedia(mediaQuery);
    setMediaQueryList(list);
    setIsMatch(list.matches);
  }, [mediaQuery]);

  useEventListener(
    "change",
    (event) => setIsMatch((event as MediaQueryListEvent).matches),
    mediaQueryList
  );

  return isMatch;
};

export default useMediaQuery;
