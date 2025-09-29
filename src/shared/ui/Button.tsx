import { cn } from "../lib";

interface ButtonProps {
  title: string;
  onClick?: () => void;
  className?: string;
}

export function Button({ title, onClick, className }: ButtonProps) {
  return (
    <button
      className={cn(
        "cursor-pointer rounded-lg bg-blue-500 px-4 py-2 font-semibold text-white shadow-lg hover:bg-blue-400",
        className
      )}
      onClick={onClick}
    >
      {title}
    </button>
  );
}
