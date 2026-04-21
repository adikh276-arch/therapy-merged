import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Lock, Phone, UserCircle } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import MantraLogo from "@/assets/mantra-logo.svg";

const formSchema = z.object({
  fullName: z.string().trim().min(2, "Name must be at least 2 characters").max(100),
  email: z.string().trim().email("Please enter a valid email"),
  phone: z.string().trim().min(8, "Please enter a valid phone number").max(20),
  city: z.string().min(1, "Please select a city"),
  notes: z.string().max(500).optional(),
  consent: z.literal(true, {
    errorMap: () => ({ message: "You must agree to be contacted" }),
  }),
});

type FormData = z.infer<typeof formSchema>;

interface LeadFormProps {
  onSubmit: (data: FormData) => void;
  onBack: () => void;
}

const cities = ["Singapore", "Dubai", "Kuala Lumpur", "Abu Dhabi", "Other"];

export const LeadForm = ({ onSubmit, onBack }: LeadFormProps) => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      consent: undefined,
    },
    mode: "onChange",
  });

  const onFormSubmit = async (data: FormData) => {
    setIsSubmitting(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setIsSubmitting(false);
    onSubmit(data);
  };

  return (
    <div className="min-h-screen bg-gradient-surface">
      {/* Header */}
      <header className="bg-background/80 backdrop-blur-md border-b border-border/50 sticky top-0 z-50">
        <div className="section-container py-4 flex items-center justify-between">
          <button
            onClick={onBack}
            className="text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            ← Back
          </button>
          <img src={MantraLogo} alt="PhysioMantra" className="h-8" />
          <div className="w-16" />
        </div>
      </header>

      <main className="section-container py-12">
        <div className="max-w-lg mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-10"
          >
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <UserCircle className="w-8 h-8 text-primary" />
            </div>
            <h1 className="text-display-sm font-bold text-foreground mb-3">
              Unlock Your Personalised Pathway
            </h1>
            <p className="text-muted-foreground">
              Create your profile to view your assessment results and recovery plan.
            </p>
          </motion.div>

          {/* Form */}
          <motion.form
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            onSubmit={handleSubmit(onFormSubmit)}
            className="space-y-5"
          >
            {/* Full Name */}
            <div>
              <label htmlFor="fullName" className="block text-sm font-medium text-foreground mb-2">
                Full Name *
              </label>
              <input
                id="fullName"
                type="text"
                placeholder="Enter your name"
                className="form-input"
                {...register("fullName")}
              />
              {errors.fullName && (
                <p className="text-sm text-destructive mt-1">{errors.fullName.message}</p>
              )}
            </div>

            {/* Email */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-foreground mb-2">
                Email Address *
              </label>
              <input
                id="email"
                type="email"
                placeholder="your@email.com"
                className="form-input"
                {...register("email")}
              />
              {errors.email && (
                <p className="text-sm text-destructive mt-1">{errors.email.message}</p>
              )}
            </div>

            {/* Phone */}
            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-foreground mb-2">
                Phone Number *
              </label>
              <input
                id="phone"
                type="tel"
                placeholder="+65 / +971 / +60"
                className="form-input"
                {...register("phone")}
              />
              {errors.phone && (
                <p className="text-sm text-destructive mt-1">{errors.phone.message}</p>
              )}
            </div>

            {/* City */}
            <div>
              <label htmlFor="city" className="block text-sm font-medium text-foreground mb-2">
                City *
              </label>
              <select
                id="city"
                className="form-input"
                {...register("city")}
              >
                <option value="">Select your city</option>
                {cities.map((city) => (
                  <option key={city} value={city}>{city}</option>
                ))}
              </select>
              {errors.city && (
                <p className="text-sm text-destructive mt-1">{errors.city.message}</p>
              )}
            </div>

            {/* Notes */}
            <div>
              <label htmlFor="notes" className="block text-sm font-medium text-foreground mb-2">
                Anything else we should know? (Optional)
              </label>
              <textarea
                id="notes"
                placeholder="Any specific concerns or questions?"
                rows={3}
                className="form-input resize-none"
                {...register("notes")}
              />
            </div>

            {/* Consent */}
            <div className="flex items-start gap-3">
              <input
                type="checkbox"
                id="consent"
                className="mt-1 w-5 h-5 rounded border-border text-primary focus:ring-primary"
                {...register("consent")}
              />
              <label htmlFor="consent" className="text-sm text-muted-foreground">
                I agree to be contacted by PhysioMantra regarding my physiotherapy plan
              </label>
            </div>
            {errors.consent && (
              <p className="text-sm text-destructive">{errors.consent.message}</p>
            )}

            {/* Submit */}
            <motion.button
              type="submit"
              disabled={!isValid || isSubmitting}
              className="btn-hero w-full disabled:opacity-50 disabled:cursor-not-allowed"
              whileHover={isValid && !isSubmitting ? { scale: 1.02 } : {}}
              whileTap={isValid && !isSubmitting ? { scale: 0.98 } : {}}
            >
              {isSubmitting ? (
                <motion.div
                  className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                />
              ) : (
                <>
                  Continue to Recovery Plans
                  <ArrowRight className="w-5 h-5" />
                </>
              )}
            </motion.button>

            {/* Trust signals */}
            <div className="flex items-center justify-center gap-6 text-sm text-muted-foreground pt-4">
              <span className="flex items-center gap-1.5">
                <Lock className="w-4 h-4" />
                Secure & private
              </span>
              <span className="flex items-center gap-1.5">
                <Phone className="w-4 h-4" />
                No spam calls
              </span>
            </div>
          </motion.form>
        </div>
      </main>
    </div>
  );
};
