import ThemeSwitcher from "./ThemeSwitcher";

const Header = () => {
  return (
    <header className="bg">
      <div className="flex mx-auto  justify-between max-w-sm px-4 pt-12 items-center">
        <h1 className="uppercase font-bold text-3xl tracking-[.3em] text-white">
          TODO
        </h1>
        <ThemeSwitcher />
      </div>
    </header>
  );
};
export default Header;
