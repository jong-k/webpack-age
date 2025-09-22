import { lazy } from "react";
import { BrowserRouter, Route, Routes } from "react-router";
import AppLayout from "../layouts/AppLayout";

const Home = lazy(() => import("../../pages/Home"));
const Check = lazy(() => import("../../pages/Check"));
const Ticket = lazy(() => import("../../pages/Ticket"));

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AppLayout />}>
          <Route index element={<Home />} />
          <Route path="/ticket" element={<Ticket />} />
          <Route path="/check" element={<Check />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
