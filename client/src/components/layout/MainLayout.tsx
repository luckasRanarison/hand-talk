import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";

const MainLayout = () => (
  <div className="h-screen flex flex-col">
    <Navbar />
    <Outlet />
  </div>
);

export default MainLayout;
