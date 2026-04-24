import { PremiumComplete } from "../../../../components/shared/PremiumComplete";

import { useTranslation } from "react-i18next";
import { Sparkles, Heart } from "lucide-react";
import { motion } from "framer-motion";

interface Props {
    onGoHome: () => void;
}

const AffirmationScreen = ({ onGoHome }: Props) => {
    const { t } = useTranslation();
    return (
        <PremiumComplete
            title={t('affirmation.title')}
            message={t('affirmation.p1')}
            onRestart={onGoHome}
            icon={<Heart size={48} fill="currentColor" className="text-primary" />}
        >
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.5 }}
                className="p-8 bg-slate-900 rounded-[2.5rem] text-white my-8 text-center"
            >
                <Sparkles size={24} className="mx-auto mb-4 text-primary" />
                <p className="text-lg font-bold italic leading-relaxed">
                    {t('affirmation.p2')}
                </p>
            </motion.div>
        </PremiumComplete>

    );
};

export default AffirmationScreen;
