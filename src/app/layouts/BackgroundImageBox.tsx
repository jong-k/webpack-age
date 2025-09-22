import { useEffect, useState } from "react";
import { useLocation } from "react-router";
import fieldImage from "../../assets/images/field.jpg";
import robotImage from "../../assets/images/robot.jpg";

interface BackgroundImageBoxProps {
  children: React.ReactNode;
}

export function BackgroundImageBox({ children }: BackgroundImageBoxProps) {
  const [backgroundImageSrc, setBackgroundImageSrc] = useState<string>(robotImage);
  const { pathname } = useLocation();

  useEffect(() => {
    if (!pathname) return;
    if (pathname === "/ticket") setBackgroundImageSrc(fieldImage);
    else setBackgroundImageSrc(robotImage);
  }, [pathname]);

  return (
    <div className="w-full overflow-x-hidden">
      <div
        className="min-h-dvh w-full min-w-xs"
        style={{
          backgroundImage: `url(${backgroundImageSrc})`,
          backgroundSize: "cover",
          backgroundPosition: "top",
          backgroundRepeat: "no-repeat",
        }}
      >
        {children}
      </div>
    </div>
  );
}
