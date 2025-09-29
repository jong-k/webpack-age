import { cn } from "../lib";

interface ButtonProps {
  title: string;
  onClick?: () => void;
  className?: string;
}

export function Button({ title, onClick, className }: ButtonProps) {
  return (
    <button className={cn("", className)} onClick={onClick}>
      {title}
    </button>
  );
}
