import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import ThemeContextProvider from "./context/theme/Provider.tsx";
import EditorContextProvider from "./context/editor/Provider.tsx";
import ModelContextProvider from "./context/models/Provider.tsx";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <ThemeContextProvider>
      <EditorContextProvider>
        <ModelContextProvider>
          <App />
        </ModelContextProvider>
      </EditorContextProvider>
    </ThemeContextProvider>
  </React.StrictMode>
);
