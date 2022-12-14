import { useDarkMode } from "../hooks/useDarkMode";
import sun from "../assets/icon-sun.svg";
import moon from "../assets/icon-moon.svg";
const ThemeSwitcher = () => {
  const [isDark, setIsDark] = useDarkMode();
  const toggleTheme = () => setIsDark(!isDark);
  return (
    <button onClick={toggleTheme}>
      <span className="sr-only">toggle theme</span>
      <img src={isDark ? sun : moon} alt="theme image" />
    </button>
  );
};
export default ThemeSwitcher;
