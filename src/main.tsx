import { createRoot } from "react-dom/client";
import AppRouter from "./app/router";
import "./index.css";

const rootElement = document.getElementById("root");
if (!rootElement) throw new Error("Root element not found");

const root = createRoot(rootElement);
root.render(<AppRouter />);
