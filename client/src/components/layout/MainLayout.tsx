import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";

const MainLayout = () => (
  <div
    className="h-screen flex flex-col
    text-slate-700 bg-white
    dark:text-gray-200 dark:bg-gray-950"
  >
    <Navbar />
    <Outlet />
  </div>
);

export default MainLayout;
