import { motion } from "framer-motion";
import { ReactNode } from "react";

interface PrimaryButtonProps {
  children: ReactNode;
  onClick: () => void;
  variant?: "primary" | "secondary";
  disabled?: boolean;
}

const PrimaryButton = ({ children, onClick, variant = "primary", disabled }: PrimaryButtonProps) => {
  return (
    <motion.button
      whileTap={disabled ? {} : { scale: 0.97 }}
      whileHover={disabled ? {} : { scale: 1.01 }}
      onClick={disabled ? undefined : onClick}
      disabled={disabled}
      className={`w-full py-4 rounded-[16px] font-body font-medium text-base shadow-md transition-shadow active:shadow-sm
        ${disabled ? "opacity-50 cursor-not-allowed" : ""}
        ${variant === "primary"
          ? "bg-primary text-primary-foreground"
          : "bg-secondary text-secondary-foreground"
        }`}
    >
      {children}
    </motion.button>
  );
};

export default PrimaryButton;
