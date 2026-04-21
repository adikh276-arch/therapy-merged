import { useState } from "react";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { leadSchema, type LeadFormData } from "@/lib/validation";
import MantraCareLogo from "@/assets/MantraCare_Logo.svg";
import { User, Mail, Building2, Phone, ArrowRight, Loader2 } from "lucide-react";

const COUNTRY_CODES = [
  { code: "+91", name: "India" },
  { code: "+1", name: "United States" },
  { code: "+44", name: "United Kingdom" },
  { code: "+971", name: "UAE" },
  { code: "+65", name: "Singapore" },
  { code: "+61", name: "Australia" },
  { code: "+49", name: "Germany" },
  { code: "+33", name: "France" },
  { code: "+81", name: "Japan" },
  { code: "+86", name: "China" },
  { code: "+82", name: "South Korea" },
  { code: "+55", name: "Brazil" },
  { code: "+27", name: "South Africa" },
  { code: "+234", name: "Nigeria" },
  { code: "+254", name: "Kenya" },
  { code: "+966", name: "Saudi Arabia" },
  { code: "+974", name: "Qatar" },
  { code: "+60", name: "Malaysia" },
  { code: "+63", name: "Philippines" },
  { code: "+62", name: "Indonesia" },
  { code: "+1", name: "Canada" },
  { code: "+34", name: "Spain" },
  { code: "+39", name: "Italy" },
  { code: "+31", name: "Netherlands" },
  { code: "+41", name: "Switzerland" },
  { code: "+46", name: "Sweden" },
  { code: "+353", name: "Ireland" },
  { code: "+64", name: "New Zealand" },
];

interface LeadFormProps {
  onSubmit: (data: LeadFormData) => Promise<void>;
}

const LeadForm = ({ onSubmit }: LeadFormProps) => {
  const [countryCode, setCountryCode] = useState("+91");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isValid },
    trigger,
  } = useForm<LeadFormData>({
    resolver: zodResolver(leadSchema),
    mode: "onChange",
    defaultValues: { fullName: "", workEmail: "", phone: "", organizationName: "" },
  });

  const handlePhoneChange = (digits: string) => {
    const cleaned = digits.replace(/\D/g, "");
    setPhoneNumber(cleaned);
    const fullPhone = cleaned ? `${countryCode}${cleaned}` : "";
    setValue("phone", fullPhone, { shouldValidate: true });
    trigger("phone");
  };

  const handleCountryChange = (code: string) => {
    setCountryCode(code);
    const fullPhone = phoneNumber ? `${code}${phoneNumber}` : "";
    setValue("phone", fullPhone, { shouldValidate: true });
    trigger("phone");
  };

  const onFormSubmit = async (data: LeadFormData) => {
    setIsSubmitting(true);
    try {
      await onSubmit(data);
    } finally {
      setIsSubmitting(false);
    }
  };

  const fieldVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: (i: number) => ({
      opacity: 1,
      x: 0,
      transition: { delay: 0.15 * i, duration: 0.4 },
    }),
  };

  return (
    <div className="flex min-h-screen items-center justify-center px-4 py-8">
      <motion.div
        initial={{ opacity: 0, scale: 0.97 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="glass-card w-full max-w-md rounded-2xl p-6 shadow-xl sm:p-8"
      >
        <div className="mb-6 flex items-center justify-center">
          <img src={MantraCareLogo} alt="Mantra Care" className="h-8" />
        </div>

        <h2 className="mb-1 text-center text-xl font-bold text-foreground sm:text-2xl">
          Tell us about yourself
        </h2>
        <p className="mb-6 text-center text-sm text-muted-foreground">
          Fill in your details to spin the wheel
        </p>

        <form onSubmit={handleSubmit(onFormSubmit)} className="space-y-4">
          {/* Full Name */}
          <motion.div custom={0} initial="hidden" animate="visible" variants={fieldVariants}>
            <Label htmlFor="fullName" className="mb-1.5 flex items-center gap-1.5 text-sm font-medium">
              <User className="h-3.5 w-3.5 text-muted-foreground" />
              Full Name
            </Label>
            <Input
              id="fullName"
              placeholder="Full Name"
              {...register("fullName")}
              className={errors.fullName ? "border-destructive" : ""}
            />
            {errors.fullName && (
              <p className="mt-1 text-xs text-destructive">{errors.fullName.message}</p>
            )}
          </motion.div>

          {/* Work Email */}
          <motion.div custom={1} initial="hidden" animate="visible" variants={fieldVariants}>
            <Label htmlFor="workEmail" className="mb-1.5 flex items-center gap-1.5 text-sm font-medium">
              <Mail className="h-3.5 w-3.5 text-muted-foreground" />
              Work Email
            </Label>
            <Input
              id="workEmail"
              type="email"
              placeholder="Official Email"
              {...register("workEmail")}
              className={errors.workEmail ? "border-destructive" : ""}
            />
            {errors.workEmail && (
              <p className="mt-1 text-xs text-destructive">{errors.workEmail.message}</p>
            )}
          </motion.div>

          {/* Phone */}
          <motion.div custom={2} initial="hidden" animate="visible" variants={fieldVariants}>
            <Label className="mb-1.5 flex items-center gap-1.5 text-sm font-medium">
              <Phone className="h-3.5 w-3.5 text-muted-foreground" />
              Phone Number
            </Label>
            <div className="flex gap-2">
              <select
                value={countryCode}
                onChange={(e) => handleCountryChange(e.target.value)}
                className="h-10 w-[100px] shrink-0 rounded-md border border-input bg-background px-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
              >
                {COUNTRY_CODES.map((c) => (
                  <option key={`${c.name}-${c.code}`} value={c.code}>
                    {c.code} ({c.name})
                  </option>
                ))}
              </select>
              <Input
                type="tel"
                placeholder="Phone Number"
                value={phoneNumber}
                onChange={(e) => handlePhoneChange(e.target.value)}
                className={`flex-1 ${errors.phone ? "border-destructive" : ""}`}
              />
            </div>
            {errors.phone && (
              <p className="mt-1 text-xs text-destructive">{errors.phone.message}</p>
            )}
          </motion.div>

          {/* Organization */}
          <motion.div custom={3} initial="hidden" animate="visible" variants={fieldVariants}>
            <Label htmlFor="organizationName" className="mb-1.5 flex items-center gap-1.5 text-sm font-medium">
              <Building2 className="h-3.5 w-3.5 text-muted-foreground" />
              Organization
            </Label>
            <Input
              id="organizationName"
              placeholder="Organization Name"
              {...register("organizationName")}
              className={errors.organizationName ? "border-destructive" : ""}
            />
            {errors.organizationName && (
              <p className="mt-1 text-xs text-destructive">{errors.organizationName.message}</p>
            )}
          </motion.div>

          <motion.div custom={4} initial="hidden" animate="visible" variants={fieldVariants}>
            <button
              type="submit"
              disabled={!isValid || isSubmitting}
              className="brand-gradient mt-2 flex w-full items-center justify-center gap-2 rounded-xl px-6 py-3 text-base font-semibold text-primary-foreground shadow-md transition-all hover:shadow-lg hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:brightness-100"
            >
              {isSubmitting ? (
                <Loader2 className="h-5 w-5 animate-spin" />
              ) : (
                <>
                  Continue to Spin
                  <ArrowRight className="h-4 w-4" />
                </>
              )}
            </button>
          </motion.div>
        </form>
      </motion.div>
    </div>
  );
};

export default LeadForm;
