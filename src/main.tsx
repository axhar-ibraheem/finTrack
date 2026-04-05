import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import "./styles/index.css";
import { ERROR_MESSAGES } from "./constants";

const root = document.getElementById("root");

if (!root) throw new Error(ERROR_MESSAGES.ROOT_NOT_FOUND);

createRoot(root).render(
  <StrictMode>
    <App></App>
  </StrictMode>,
);
