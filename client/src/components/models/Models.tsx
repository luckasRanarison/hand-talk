import { useEffect } from "react";
import { useModels } from "@/context/models";
import LeftSidebar from "./left-sidebar/LeftSidebar";
import RightSidebar from "./right-sidebar/RightSidebar";
import MiddleScreen from "./middle-screen/MiddleScreen";

const Models = () => {
  const { models, fetchModels } = useModels();

  useEffect(() => {
    if (!models.length) fetchModels();
  }, []);

  return (
    <div className="h-full w-full flex">
      <LeftSidebar />
      <MiddleScreen />
      <RightSidebar />
    </div>
  );
};

export default Models;
