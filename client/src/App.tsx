import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./components/home/Home";
import Editor from "./components/editor/Editor";
import Models from "./components/models/Models";
import MainLayout from "./components/layout/MainLayout";

const App = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route index element={<Home />} />
        <Route path="/editor" element={<Editor />} />
        <Route path="/models" element={<Models />} />
      </Route>
    </Routes>
  </BrowserRouter>
);

export default App;
