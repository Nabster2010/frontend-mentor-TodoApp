import { useEffect } from "react";
import { useLocalStorage } from "./useLocalStorage";
import { useMediaQuery } from "./useMediaQuery";
export function useDarkMode() {
  const darkMode = useMediaQuery("(prefers-color-scheme:dark)");
  const [storedValue, setValue] = useLocalStorage("site-theme", darkMode);
  const isDark: boolean =
    typeof storedValue !== "undefined" ? storedValue : darkMode;
  useEffect(
    () => {
      const element = window.document.documentElement;
      if (isDark) {
        element.classList.add("dark");
      } else {
        element.classList.remove("dark");
      }
    },
    [isDark] // Only re-call effect when value changes
  );
  // Return enabled state and setter
  return [isDark, setValue];
}
