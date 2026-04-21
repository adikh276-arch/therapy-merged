import { useState, useCallback } from "react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import LandingScreen from "@/components/LandingScreen";
import LeadForm from "@/components/LeadForm";
import SpinWheel from "@/components/SpinWheel";
import SuccessScreen from "@/components/SuccessScreen";
import { spinForReward, type LeadFormData, type Reward } from "@/lib/validation";
import { AnimatePresence, motion } from "framer-motion";

type Step = "landing" | "form" | "spin" | "success";

const Index = () => {
  const [step, setStep] = useState<Step>("landing");
  const [leadId, setLeadId] = useState<string>("");
  const [leadName, setLeadName] = useState("");
  const [reward, setReward] = useState<Reward>(spinForReward());

  const handleFormSubmit = useCallback(async (data: LeadFormData) => {
    // Parse phone country from the full phone string
    const phoneCountry = data.phone.slice(0, data.phone.length > 10 ? data.phone.length - 10 : 3);
    const phoneNumber = data.phone.slice(phoneCountry.length);

    // Check if lead already exists and has spun
    const { data: existingLead } = await supabase
      .from("leads")
      .select("id")
      .eq("work_email", data.workEmail.toLowerCase())
      .maybeSingle();

    if (existingLead) {
      const { data: existingSpin } = await supabase
        .from("spins")
        .select("reward_won")
        .eq("lead_id", existingLead.id)
        .maybeSingle();

      if (existingSpin) {
        toast.error("You've already played! You won: " + existingSpin.reward_won);
        return;
      }
      // Lead exists but hasn't spun yet
      setLeadId(existingLead.id);
      setLeadName(data.fullName);
      setStep("spin");
      return;
    }

    // Insert new lead
    const { data: newLead, error } = await supabase
      .from("leads")
      .insert({
        full_name: data.fullName,
        work_email: data.workEmail.toLowerCase(),
        phone_country: phoneCountry,
        phone_number: phoneNumber,
        organization_name: data.organizationName,
      })
      .select("id")
      .single();

    if (error) {
      if (error.code === "23505") {
        toast.error("This email has already been registered.");
      } else {
        toast.error("Something went wrong. Please try again.");
        console.error(error);
      }
      return;
    }

    setLeadId(newLead.id);
    setLeadName(data.fullName);
    setStep("spin");
  }, []);

  const handleSpinComplete = useCallback(async (wonReward: Reward) => {
    // Save spin result to spins table
    const { error: spinError } = await supabase.from("spins").insert({
      lead_id: leadId,
      reward_won: wonReward.name,
      reward_probability: wonReward.probability,
    });

    if (spinError) {
      console.error("Failed to save spin:", spinError);
    }

    // Also update lead record with the reward result
    const { error: leadError } = await supabase
      .from("leads")
      .update({
        reward_won: wonReward.name,
        reward_probability: wonReward.probability
      })
      .eq("id", leadId);

    if (leadError) {
      console.error("Failed to update lead with reward:", leadError);
    }

    setReward(wonReward);
    setStep("success");
  }, [leadId]);

  return (
    <div className="min-h-screen bg-background">
      <AnimatePresence mode="wait">
        {step === "landing" && (
          <motion.div key="landing" exit={{ opacity: 0 }} transition={{ duration: 0.3 }}>
            <LandingScreen onStart={() => setStep("form")} />
          </motion.div>
        )}
        {step === "form" && (
          <motion.div key="form" exit={{ opacity: 0 }} transition={{ duration: 0.3 }}>
            <LeadForm onSubmit={handleFormSubmit} />
          </motion.div>
        )}
        {step === "spin" && (
          <motion.div key="spin" exit={{ opacity: 0 }} transition={{ duration: 0.3 }}>
            <SpinWheel reward={reward} onSpinComplete={handleSpinComplete} />
          </motion.div>
        )}
        {step === "success" && (
          <motion.div key="success" exit={{ opacity: 0 }} transition={{ duration: 0.3 }}>
            <SuccessScreen reward={reward} name={leadName} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Index;
