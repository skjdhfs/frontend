import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { editor } from "./store/data.ts";
import App from "./App.tsx";
import "./index.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App editor={editor} />
  </StrictMode>,
);
