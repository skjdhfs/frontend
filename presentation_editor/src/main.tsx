import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

import { getEditor, addEditorChangeHandler } from "./store/editor.ts";

const root = createRoot(document.getElementById("root")!);

function renderApp() {
  root.render(
    <StrictMode>
      <App editor={getEditor()}></App>
    </StrictMode>,
  );
}

addEditorChangeHandler(renderApp);
renderApp();
