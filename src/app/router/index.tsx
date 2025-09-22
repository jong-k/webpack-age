import { lazy } from "react";
import { BrowserRouter, Route, Routes } from "react-router";

const App = lazy(() => import("../../pages/App"));
const Check = lazy(() => import("../../pages/Check"));
const Ticket = lazy(() => import("../../pages/Ticket"));

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<App />} />
        <Route path="/ticket" element={<Ticket />} />
        <Route path="/check" element={<Check />} />
      </Routes>
    </BrowserRouter>
  );
}
