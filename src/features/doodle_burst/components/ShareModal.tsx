import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Copy, Download, Share2, Check } from "lucide-react";
import { createPoster } from "@/lib/share";
import { useTranslation } from "react-i18next";

interface ShareModalProps {
  isOpen: boolean;
  onClose: () => void;
  originalDataUrl: string;
}

export default function ShareModal({ isOpen, onClose, originalDataUrl }: ShareModalProps) {
  const { t } = useTranslation();
  const [posterUrl, setPosterUrl] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);

  useEffect(() => {
    if (isOpen && originalDataUrl) {
      setIsGenerating(true);
      createPoster(originalDataUrl).then((url) => {
        setPosterUrl(url);
        setIsGenerating(false);
      });
    } else {
      setPosterUrl(null);
      setCopied(false);
    }
  }, [isOpen, originalDataUrl]);



  const shareText = t("share_text");

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(shareText);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  const handleDownload = () => {
    if (!posterUrl) return;
    const link = document.createElement("a");
    link.href = posterUrl;
    link.download = "therapy-mantra-doodle.png";
    link.click();
  };

  const handleNativeShare = async () => {
    if (!posterUrl) return;
    try {
      const response = await fetch(posterUrl);
      const blob = await response.blob();
      const file = new File([blob], "therapy-mantra-doodle.png", { type: "image/png" });

      if (navigator.canShare && navigator.canShare({ files: [file] })) {
        await navigator.share({
          files: [file],
          title: "Doodle Burst by TherapyMantra",
          text: shareText,
        });
      }
    } catch (error) {
      console.error("Native share error:", error);
    }
  };

  const canShareNatively = typeof navigator !== "undefined" && !!navigator.share;

  return (
    <AnimatePresence>
      {isOpen && (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 bg-foreground/40 backdrop-blur-sm flex items-center justify-center p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.9, opacity: 0, y: 20 }}
          className="bg-card rounded-3xl shadow-glow max-w-md w-full overflow-hidden flex flex-col max-h-[90vh]"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-border">
            <h2 className="text-xl font-bold text-foreground">Share Your Doodle ⚡</h2>
            <button
              onClick={onClose}
              className="p-2 rounded-xl bg-muted hover:bg-muted/80 transition-colors"
            >
              <X size={20} className="text-foreground" />
            </button>
          </div>

          <div className="p-6 overflow-y-auto flex flex-col gap-6 hide-scrollbar">
            {/* Poster Preview */}
            <div className="w-full aspect-square bg-muted rounded-2xl flex items-center justify-center overflow-hidden border border-border">
              {isGenerating || !posterUrl ? (
                <div className="flex flex-col items-center gap-3 text-muted-foreground animate-pulse">
                  <div className="w-10 h-10 rounded-full border-4 border-primary border-t-transparent animate-spin" />
                  <p className="text-sm font-semibold">Generating Poster...</p>
                </div>
              ) : (
                <img
                  src={posterUrl}
                  alt="Doodle Poster Preview"
                  className="w-full h-full object-cover"
                />
              )}
            </div>

            {/* Share Text Preview & Copy */}
            <div className="bg-muted/50 rounded-2xl p-4 border border-border relative group">
              <p className="text-sm text-foreground whitespace-pre-wrap pr-10">
                {shareText}
              </p>
              <button
                onClick={handleCopy}
                className="absolute top-4 right-4 p-2 bg-card rounded-xl shadow-soft hover:scale-105 active:scale-95 transition-all text-foreground"
                title="Copy Text"
              >
                {copied ? <Check size={18} className="text-green-500" /> : <Copy size={18} />}
              </button>
            </div>

            {/* Actions */}
            <div className="flex flex-col gap-3">
              {canShareNatively && (
                <button
                  onClick={handleNativeShare}
                  disabled={!posterUrl}
                  className="w-full py-3 px-4 rounded-xl font-bold text-primary-foreground bg-primary flex flex-row items-center justify-center gap-2 hover:opacity-90 active:scale-[0.98] transition-all disabled:opacity-50"
                >
                  <Share2 size={18} />
                  Share to Social Apps
                </button>
              )}

              <button
                onClick={handleDownload}
                disabled={!posterUrl}
                className="w-full py-3 px-4 rounded-xl font-bold text-foreground bg-card border-2 border-border flex flex-row items-center justify-center gap-2 hover:bg-muted/50 active:scale-[0.98] transition-all disabled:opacity-50"
              >
                <Download size={18} />
                Download Poster Image
              </button>
            </div>
          </div>
        </motion.div>
      </motion.div>
      )}
    </AnimatePresence>
  );
}
