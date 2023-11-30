import { RefObject, useEffect, useState } from "react";

const useOnScreen = (ref: RefObject<HTMLElement>, rootMargin = "0px") => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (ref.current == null) return;
    const observer = new IntersectionObserver(
      ([entry]) => setIsVisible(entry.isIntersecting),
      { rootMargin }
    );
    observer.observe(ref.current);
    const refElement = ref.current;
    return () => {
      if (refElement == null) return;
      observer.unobserve(refElement);
    };
  }, [ref, rootMargin]);

  return isVisible;
};

export default useOnScreen;
