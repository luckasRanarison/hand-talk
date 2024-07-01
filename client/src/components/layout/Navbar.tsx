import { RiQuestionLine } from "react-icons/ri";
import { Link, useLocation } from "react-router-dom";

const routes = ["/", "/editor", "/trainer", "/detector"];

const Navbar = () => {
  const location = useLocation();

  return (
    <div
      className="flex items-center justify-between border-b-[1px]
      border-b-gray-300 px-6 py-3 text-slate-700 text-[15px]"
    >
      <div className="space-x-5">
        {routes.map((route) => (
          <Link
            key={route}
            to={route}
            className={location.pathname == route ? "text-blue-600" : ""}
          >
            {route == "/"
              ? "Home"
              : route.slice(1, 2).toUpperCase() + route.slice(2)}
          </Link>
        ))}
      </div>
      <div>
        <button onClick={() => {}}>
          <RiQuestionLine />
        </button>
      </div>
    </div>
  );
};

export default Navbar;
