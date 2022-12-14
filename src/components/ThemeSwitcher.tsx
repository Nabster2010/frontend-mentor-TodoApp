import { useDarkMode } from "usehooks-ts";
import sun from "../assets/icon-sun.svg";
import moon from "../assets/icon-moon.svg";
import { useEffect } from "react";
const ThemeSwitcher = () => {
  const { isDarkMode, toggle } = useDarkMode();
  useEffect(() => {
    const element = window.document.documentElement;
    if (isDarkMode) {
      element.classList.add("dark");
    } else {
      element.classList.remove("dark");
    }
  }, [isDarkMode]);

  return (
    <button onClick={toggle}>
      <span className="sr-only">toggle theme</span>
      <img src={isDarkMode ? sun : moon} alt="theme image" />
    </button>
  );
};
export default ThemeSwitcher;
