import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Share2, Copy, Check, Twitter, Facebook, MessageCircle, Send } from 'lucide-react';
import { useTranslation } from 'react-i18next';

interface ShareModalProps {
  isOpen: boolean;
  onClose: () => void;
  activityName: string;
}

const ShareModal: React.FC<ShareModalProps> = ({ isOpen, onClose, activityName }) => {
  const { t } = useTranslation();
  const [copied, setCopied] = React.useState(false);

  const androidUrl = "https://play.google.com/store/apps/details?id=org.mantracare.therapy";
  const iosUrl = "https://apps.apple.com/pk/app/therapymantra/id1607643888";
  
  // Use interpolation for activityName and URLs
  const shareText = t('common.share_text', {
    defaultValue: "I have done this {{activityName}} in TherapyMantra and really enjoy it you can do it too just follow the link to android app {{androidUrl}} or ios app {{iosUrl}}",
    activityName: activityName || t('common.this_activity', 'this activity'),
    androidUrl,
    iosUrl
  });

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(shareText);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy: ', err);
    }
  };

  const shareOptions = [
    {
      name: 'WhatsApp',
      icon: <MessageCircle className="text-emerald-500" />,
      url: `https://wa.me/?text=${encodeURIComponent(shareText)}`,
      color: 'bg-emerald-50'
    },
    {
      name: 'Twitter',
      icon: <Twitter className="text-sky-500" />,
      url: `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}`,
      color: 'bg-sky-50'
    },
    {
      name: 'Facebook',
      icon: <Facebook className="text-blue-600" />,
      url: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(androidUrl)}&quote=${encodeURIComponent(shareText)}`,
      color: 'bg-blue-50'
    },
    {
      name: 'Telegram',
      icon: <Send className="text-blue-400" />,
      url: `https://t.me/share/url?url=${encodeURIComponent(androidUrl)}&text=${encodeURIComponent(shareText)}`,
      color: 'bg-blue-50'
    }
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-[100]"
          />
          <div className="fixed inset-0 flex items-center justify-center pointer-events-none z-[101] p-6">
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="bg-white w-full max-w-sm rounded-[2.5rem] shadow-2xl pointer-events-auto overflow-hidden border border-slate-100"
            >
              <div className="p-8 space-y-8">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary">
                      <Share2 size={24} />
                    </div>
                    <div>
                      <h3 className="font-black text-slate-900 text-xl leading-tight">{t('common.share_progress', 'Share Progress')}</h3>
                      <p className="text-slate-500 text-sm font-bold">{t('common.inspire_others', 'Inspire others today')}</p>
                    </div>
                  </div>
                  <button 
                    onClick={onClose}
                    className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center text-slate-400 hover:text-slate-900 hover:bg-slate-100 transition-all"
                  >
                    <X size={20} />
                  </button>
                </div>

                <div className="bg-slate-50 rounded-3xl p-6 border-2 border-dashed border-slate-200">
                   <p className="text-slate-600 text-sm font-bold leading-relaxed line-clamp-4 italic">
                     "{shareText}"
                   </p>
                </div>

                <div className="grid grid-cols-4 gap-4">
                  {shareOptions.map((option) => (
                    <a
                      key={option.name}
                      href={option.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex flex-col items-center gap-2 group"
                    >
                      <div className={`w-14 h-14 rounded-2xl ${option.color} flex items-center justify-center transition-all group-hover:scale-110 group-active:scale-95 shadow-sm`}>
                        {option.icon}
                      </div>
                      <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{option.name}</span>
                    </a>
                  ))}
                </div>

                <button
                  onClick={handleCopy}
                  className={`w-full py-5 rounded-2xl flex items-center justify-center gap-3 transition-all font-black text-sm uppercase tracking-widest ${
                    copied 
                      ? 'bg-emerald-500 text-white shadow-xl shadow-emerald-200' 
                      : 'bg-slate-900 text-white shadow-xl shadow-slate-200 hover:bg-slate-800'
                  }`}
                >
                  {copied ? (
                    <>
                      <Check size={20} />
                      {t('common.copied', 'Copied!')}
                    </>
                  ) : (
                    <>
                      <Copy size={20} />
                      {t('common.copy_message', 'Copy Message')}
                    </>
                  )}
                </button>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
};

export default ShareModal;
