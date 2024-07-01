import EditorContextProvider from "@/context/editor/Provider";
import Navbar from "../layout/Navbar";
import LeftSidebar from "./left-sidebar/LeftSidebar";
import MiddleScreen from "./middle-screen/MiddleScreen";
import RightSidebar from "./right-sidebar/RightSideBar";

const Editor = () => {
  return (
    <EditorContextProvider>
      <div className="w-full flex flex-1 overflow-auto">
        <LeftSidebar />
        <MiddleScreen />
        <RightSidebar />
      </div>
    </EditorContextProvider>
  );
};

export default Editor;
