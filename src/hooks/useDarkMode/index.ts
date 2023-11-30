import { useEffect } from "react";

import useMediaQuery from "../useMediaQuery";
import { useLocalStorage } from "../useStorage";

const useDarkMode = (): [boolean, () => void] => {
  const [darkMode, setDarkMode] = useLocalStorage<"dark" | "white">("dark");
  const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");
  const enabled = darkMode === "dark" || prefersDarkMode;

  useEffect(() => {
    document.body.classList.toggle("dark-mode", enabled);
  }, [enabled]);

  return [enabled, () => setDarkMode(darkMode === "dark" ? "white" : "dark")];
};

export default useDarkMode;
