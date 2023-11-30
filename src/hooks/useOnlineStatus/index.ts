import { useState } from "react";
import useEventListener from "../useEventListener";

const useOnlineStatus = () => {
  const [online, setOnline] = useState(navigator.onLine);

  useEventListener(
    "online" as keyof DocumentEventMap,
    () => setOnline(navigator.onLine),
    window
  );
  useEventListener(
    "offline" as keyof DocumentEventMap,
    () => setOnline(navigator.onLine),
    window
  );

  return online;
};

export default useOnlineStatus;
