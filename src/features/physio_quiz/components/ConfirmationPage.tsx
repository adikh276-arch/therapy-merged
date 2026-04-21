import { motion } from "framer-motion";
import { Check, Mail, Phone, Download, ArrowRight } from "lucide-react";
import MantraLogo from "@/assets/mantra-logo.svg";

interface ConfirmationPageProps {
  email: string;
}

const steps = [
  {
    icon: Check,
    title: "Assessment received",
    description: "Your physiotherapist will review your body check results",
  },
  {
    icon: Phone,
    title: "We'll reach out",
    description: "Expect a call or WhatsApp within 24 hours to schedule your first session",
  },
  {
    icon: Download,
    title: "Get the app",
    description: "Download the PhysioMantra app for seamless video sessions",
  },
  {
    icon: ArrowRight,
    title: "Begin recovery",
    description: "Start your personalized recovery journey with your physiotherapist",
  },
];

export const ConfirmationPage = ({ email }: ConfirmationPageProps) => {
  return (
    <div className="min-h-screen bg-gradient-surface flex items-center justify-center py-12">
      <div className="section-container">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="max-w-xl mx-auto text-center"
        >
          {/* Logo */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="mb-8"
          >
            <img src={MantraLogo} alt="PhysioMantra" className="h-12 mx-auto" />
          </motion.div>
          
          {/* Success icon */}
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            className="w-24 h-24 mx-auto rounded-full bg-green-100 flex items-center justify-center mb-8"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.4, type: "spring", stiffness: 300 }}
            >
              <Check className="w-12 h-12 text-green-600" />
            </motion.div>
          </motion.div>
          
          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-display-sm font-bold text-foreground mb-3"
          >
            You're All Set!
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-lg text-muted-foreground mb-10"
          >
            Thank you for choosing PhysioMantra
          </motion.p>
          
          {/* Steps */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="space-y-4 mb-10"
          >
            <h2 className="text-lg font-semibold text-foreground mb-6">
              What happens next:
            </h2>
            
            {steps.map((step, index) => (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.6 + index * 0.1 }}
                className="flex items-start gap-4 text-left p-4 rounded-xl bg-card border border-border"
              >
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <step.icon className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-medium text-foreground">{step.title}</h3>
                  <p className="text-sm text-muted-foreground">{step.description}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
          
          {/* Email confirmation */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            className="p-4 rounded-xl bg-brand-pale border border-primary/10 flex items-center justify-center gap-3"
          >
            <Mail className="w-5 h-5 text-primary" />
            <p className="text-sm text-foreground">
              Confirmation sent to: <span className="font-medium">{email}</span>
            </p>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};
