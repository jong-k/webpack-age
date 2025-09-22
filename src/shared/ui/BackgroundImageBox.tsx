interface BackgroundImageBoxProps {
  children: React.ReactNode;
  imgSrc: string;
}

export function BackgroundImageBox({ children, imgSrc }: BackgroundImageBoxProps) {
  return (
    <div className="w-full overflow-x-hidden">
      <div
        className="min-h-dvh w-full min-w-xs"
        style={{
          backgroundImage: `url(${imgSrc})`,
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
