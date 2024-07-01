import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./components/home/Home";
import Editor from "./components/editor/Editor";
import Trainer from "./components/trainer/Trainer";
import Detector from "./components/detector/Detector";
import MainLayout from "./components/layout/MainLayout";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Home />} />
          <Route path="/editor" element={<Editor />} />
          <Route path="/trainer" element={<Trainer />} />
          <Route path="/detector" element={<Detector />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
