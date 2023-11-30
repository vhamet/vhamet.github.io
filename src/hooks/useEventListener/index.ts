import { useEffect, useRef } from "react";

const useEventListener = <K extends keyof DocumentEventMap>(
  eventType: K,
  callback: (event: DocumentEventMap[K]) => void,
  element: EventTarget = document
) => {
  const callbackRef = useRef(callback);

  useEffect(() => {
    callbackRef.current = callback;
  }, [callback]);

  useEffect(() => {
    if (element == null) return;
    const handler = (event: DocumentEventMap[K]) => callbackRef.current(event);
    element.addEventListener(
      eventType,
      handler as EventListenerOrEventListenerObject
    );

    return () =>
      element.removeEventListener(
        eventType,
        handler as EventListenerOrEventListenerObject
      );
  }, [eventType, element]);
};

export default useEventListener;
