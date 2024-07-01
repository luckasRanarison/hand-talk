import { useTheme } from "@/context/theme";
import { RiContrastFill, RiMoonLine, RiQuestionLine } from "react-icons/ri";
import { Link, useLocation } from "react-router-dom";

const routes = ["/", "/editor", "/trainer", "/detector"];

const Navbar = () => {
  const { pathname } = useLocation();
  const { toggleTheme } = useTheme();

  return (
    <div
      className="flex items-center justify-between border-b-[1px]
      border-b-gray-300 px-6 py-3 text-[15px] dark:border-gray-800"
    >
      <div className="space-x-5">
        {routes.map((route) => (
          <Link
            key={route}
            to={route}
            className={`${
              pathname == route && "text-blue-600 dark:text-blue-400"
            }`}
          >
            {route == "/"
              ? "Home"
              : route.slice(1, 2).toUpperCase() + route.slice(2)}
          </Link>
        ))}
      </div>
      <button onClick={toggleTheme}>
        <RiContrastFill />
      </button>
    </div>
  );
};

export default Navbar;
