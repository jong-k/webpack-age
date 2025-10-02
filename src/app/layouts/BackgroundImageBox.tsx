import { useState } from "react";
// import { useLocation } from "react-router";
// import fieldImage from "../../assets/images/field.jpg";
import robotImage from "../../assets/images/robot.jpg";
import { DEFAULT_BOT_PERCENT } from "../../shared/config";

interface BackgroundImageBoxProps {
  children: React.ReactNode;
  isBotPercent?: number;
}

export function BackgroundImageBox({ children, isBotPercent }: BackgroundImageBoxProps) {
  const [backgroundImageSrc] = useState<string>(robotImage);
  // const { pathname } = useLocation();
  // TODO: 소수점 1자리로 끊기
  const opacity = 1 - (isBotPercent ?? DEFAULT_BOT_PERCENT);

  // useEffect(() => {
  //   if (pathname.startsWith(ROUTES.TICKET)) setBackgroundImageSrc(fieldImage);
  //   else setBackgroundImageSrc(robotImage);
  // }, [pathname]);

  return (
    <div className="w-full overflow-x-hidden">
      <div
        className="flex min-h-dvh w-full min-w-xs flex-col"
        style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,${opacity})), url(${backgroundImageSrc})`,
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
