import { ButtonHTMLAttributes } from "react";

interface PrimaryButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "outline";
}

export function PrimaryButton({ children, variant = "primary", className = "", ...props }: PrimaryButtonProps) {
  const base = "w-full py-3 px-6 rounded-lg font-medium text-base transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary/50 disabled:opacity-50";
  const variants = {
    primary: "bg-primary text-primary-foreground hover:opacity-90",
    outline: "border-2 border-primary text-primary bg-transparent hover:bg-primary/5",
  };
  return (
    <button className={`${base} ${variants[variant]} ${className}`} {...props}>
      {children}
    </button>
  );
}
