import { Suspense } from "react";
import { Outlet } from "react-router";
import { BackgroundImageBox } from "./BackgroundImageBox";
import Header from "./Header";
import { ResponsiveBox } from "../../shared/ui";

export default function AppLayout() {
  return (
    <BackgroundImageBox>
      <Header />
      <ResponsiveBox className="py-4">
        <Suspense fallback={<div className="flex min-h-dvh items-center justify-center">Loading...</div>}>
          <Outlet />
        </Suspense>
      </ResponsiveBox>
    </BackgroundImageBox>
  );
}
