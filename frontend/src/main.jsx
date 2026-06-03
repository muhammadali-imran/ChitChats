/*
  Main.jsx
  Application entry point.
*/
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { initTheme } from "./shared/utils/theme";
import "./index.css";
import App from "./app/App.jsx";

initTheme();

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
