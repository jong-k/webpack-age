import { lazy } from "react";
import { BrowserRouter, Route, Routes } from "react-router";
import { ROUTES } from "../../shared/config";
import AppLayout from "../layouts/AppLayout";

const Home = lazy(() => import("../../pages/Home"));
const TurnstilePage = lazy(() => import("../../pages/Turnstile"));
const RecaptchaPage = lazy(() => import("../../pages/Recaptcha"));
// const Ticket = lazy(() => import("../../pages/Ticket"));

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AppLayout />}>
          <Route index element={<Home />} />
          <Route path={ROUTES.TURNSTILE} element={<TurnstilePage />} />
          <Route path={ROUTES.RECAPTCHA} element={<RecaptchaPage />} />
          {/* <Route path="/ticket" element={<Ticket />} /> */}
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
