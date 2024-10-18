/* eslint-disable no-unused-vars */
import { assets } from "../assets/assets";
import useTheme from "../context/Theme";

export default function ThemeBtn() {
  const { themeMode, lightTheme, darkTheme } = useTheme();

  return (
    <div className="flex px-5">
      {themeMode === "dark" ? (
        <img
          src={assets.sun}
          alt="sun"
          className="w-7 dark_sun cursor-pointer"
          title="Light Mode"
          onClick={lightTheme}
        />
      ) : (
        <img
          src={assets.moon}
          alt="moon"
          className="w-7 cursor-pointer"
          title="Dark Mode"
          onClick={darkTheme}
        />
      )}
    </div>
  );
}
