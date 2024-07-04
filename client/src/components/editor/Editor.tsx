import LeftSidebar from "./left-sidebar/LeftSidebar";
import MiddleScreen from "./middle-screen/MiddleScreen";
import RightSidebar from "./right-sidebar/RightSideBar";
import { useEditor } from "@/context/editor";
import { useEffect } from "react";

const Editor = () => {
  const { gestures, fetchGestures } = useEditor();

  useEffect(() => {
    if (!gestures.length) fetchGestures();
  }, []);

  return (
    <div className="w-full flex flex-1 overflow-auto">
      <LeftSidebar />
      <MiddleScreen />
      <RightSidebar />
    </div>
  );
};

export default Editor;
