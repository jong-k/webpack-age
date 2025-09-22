import { cn } from "../lib/style";

interface ResponsiveBoxProps {
  children: React.ReactNode;
  className?: string;
}

export function ResponsiveBox({ children, className }: ResponsiveBoxProps) {
  return <div className={cn("container mx-auto px-4 md:px-10 lg:px-16", className)}>{children}</div>;
}
