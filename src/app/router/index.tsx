import { lazy } from "react";
import { BrowserRouter, Route, Routes } from "react-router";
import { ROUTES } from "../../shared/config";
import AppLayout from "../layouts/AppLayout";

const Home = lazy(() => import("../../pages/Home"));
const Turnstile = lazy(() => import("../../pages/Turnstile"));
const Ticket = lazy(() => import("../../pages/Ticket"));

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AppLayout />}>
          <Route index element={<Home />} />
          <Route path={ROUTES.TURNSTILE} element={<Turnstile />} />
          <Route path="/ticket" element={<Ticket />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
