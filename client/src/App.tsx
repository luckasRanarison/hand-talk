import Navbar from "./components/Navbar";
import LeftSidebar from "./components/LeftSidebar";
import RightSidebar from "./components/RightSideBar";
import MiddleScreen from "./components/MiddleScreen";

const App = () => (
  <div className="h-screen flex flex-col">
    <Navbar />
    <div className="w-full flex flex-1 overflow-auto">
      <LeftSidebar />
      <MiddleScreen />
      <RightSidebar />
    </div>
  </div>
);

export default App;
