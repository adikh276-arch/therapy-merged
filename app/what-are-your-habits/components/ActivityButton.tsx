import { motion } from "framer-motion";

interface ActivityButtonProps {
  label: string;
  onClick: () => void;
  disabled?: boolean;
}

const ActivityButton = ({ label, onClick, disabled = false }: ActivityButtonProps) => {
  return (
    <motion.button
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      disabled={disabled}
      className="w-full h-[50px] rounded-2xl bg-primary text-primary-foreground font-semibold text-base transition-opacity duration-200 disabled:opacity-40"
    >
      {label}
    </motion.button>
  );
};

export default ActivityButton;
