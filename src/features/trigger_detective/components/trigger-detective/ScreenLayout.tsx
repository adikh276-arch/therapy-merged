import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft } from "lucide-react";
import { ReactNode } from "react";
import { useTranslation } from "react-i18next";

interface ScreenLayoutProps {
  children: ReactNode;
  onBack?: () => void;
  title?: string;
  showBack?: boolean;
}

const ScreenLayout = ({ children, onBack, title, showBack = true }: ScreenLayoutProps) => {
  const { t } = useTranslation();
  return (
    <motion.div
      initial={{ opacity: 0, x: 40 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -40 }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      className="flex flex-col min-h-screen max-w-md mx-auto px-6 py-4"
    >
      {showBack && (
        <button
          onClick={onBack}
          className="flex items-center gap-1 text-primary font-body font-medium text-sm mb-4 self-start active:scale-95 transition-transform"
        >
          <ChevronLeft className="w-4 h-4" />
          {t("common_back") || "Back"}
        </button>
      )}
      {title && (
        <h1 className="text-2xl font-heading font-bold text-foreground mb-4">{title}</h1>
      )}
      <div className="flex-1 flex flex-col">{children}</div>
    </motion.div>
  );
};

export default ScreenLayout;
