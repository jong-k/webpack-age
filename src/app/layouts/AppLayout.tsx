import { Suspense } from "react";
import { Outlet } from "react-router";
import { BackgroundImageBox } from "./BackgroundImageBox";
import Header from "./Header";
import { useOpacity } from "../../features/display-robot/model";
import { ResponsiveBox } from "../../shared/ui";

export default function AppLayout() {
  const { opacity } = useOpacity();

  return (
    <BackgroundImageBox isBotPercent={opacity}>
      {/* TODO: 부모 컴포넌트 리렌더링으로부터 자유로워지기 위해 memoization 필요 */}
      <Header />
      <ResponsiveBox className="py-4">
        <Suspense
          fallback={
            <div
              className="flex items-center justify-center"
              // TODO: 하드코딩된 92px 처리하기
              style={{
                minHeight: "calc(100dvh - 92px)",
              }}
            >
              Loading...
            </div>
          }
        >
          <Outlet />
        </Suspense>
      </ResponsiveBox>
    </BackgroundImageBox>
  );
}
