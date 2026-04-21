import React from 'react';
import { Toaster } from "./components/ui/toaster";
import { Toaster as Sonner } from "./components/ui/sonner";
import { TooltipProvider } from "./components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { HashRouter, Routes, Route } from "react-router-dom";
import { ProgressProvider } from "./contexts/ProgressContext";
import { SystemStatus } from "./components/SystemStatus";
import { AppLayout } from "./components/layout/AppLayout";

// Main Pages
import Dashboard from "./pages/Dashboard";
import AdminDashboard from "./pages/admin/AdminDashboard";
import NotFound from "./pages/NotFound";

// Layer 0 Intern Pathways
import InternWelcome from "./pages/layer0/InternWelcome";
import InternVerification from "./pages/layer0/InternVerification";
import InternHowItWorks from "./pages/layer0/InternHowItWorks";
import InternEarnings from "./pages/layer0/InternEarnings";

// Layer 1 Pathways
import WelcomePathway from "./pages/layer1/WelcomePathway";
import VerificationPathway from "./pages/layer1/VerificationPathway";
import HowItWorksPathway from "./pages/layer1/HowItWorksPathway";
import ClinicalToolsPathway from "./pages/layer1/ClinicalToolsPathway";
import EarningsPathway from "./pages/layer1/EarningsPathway";

// Layer 2 Pathways
import GettingPatientsPathway from "./pages/layer2/GettingPatientsPathway";
import BringPatientsPathway from "./pages/layer2/BringPatientsPathway";
import ProfessionalIdentityPathway from "./pages/layer2/ProfessionalIdentityPathway";
import LocalAwarenessPathway from "./pages/layer2/LocalAwarenessPathway";

// Layer 3 Pathways
import InvitePhysiosPathway from "./pages/layer3/InvitePhysiosPathway";
import ClinicConnectionPathway from "./pages/layer3/ClinicConnectionPathway";
import SpecialistProfilePathway from "./pages/layer3/SpecialistProfilePathway";

// Layer 4 Pathways
import WellnessPartnerPathway from "./pages/layer4/WellnessPartnerPathway";
import CorporateReadinessPathway from "./pages/layer4/CorporateReadinessPathway";
import ShareLeadsPathway from "./pages/layer4/ShareLeadsPathway";
import AssistedOnboardingPathway from "./pages/layer4/AssistedOnboardingPathway";

// Layer 5 Pathways
import CommunityPathway from "./pages/layer5/CommunityPathway";
import TrainingPathway from "./pages/layer5/TrainingPathway";
import RecognitionPathway from "./pages/layer5/RecognitionPathway";

// Layer 6 Mentorship Pathways
import BecomeMentor from "./pages/layer6/BecomeMentor";
import MentorAssignment from "./pages/layer6/MentorAssignment";
import InternFeedback from "./pages/layer6/InternFeedback";
import InternGraduation from "./pages/layer6/InternGraduation";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <React.Fragment>
      <ProgressProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <AppLayout>
            <Routes>
              {/* Main Routes */}
              <Route path="/" element={<Dashboard />} />
              <Route path="/admin" element={<AdminDashboard />} />

              {/* Layer 0: Intern Track */}
              <Route path="/layer0/welcome" element={<InternWelcome />} />
              <Route path="/layer0/verification" element={<InternVerification />} />
              <Route path="/layer0/how-it-works" element={<InternHowItWorks />} />
              <Route path="/layer0/earnings" element={<InternEarnings />} />

              {/* Layer 1: Foundation */}
              <Route path="/layer1/welcome" element={<WelcomePathway />} />
              <Route path="/layer1/verification" element={<VerificationPathway />} />
              <Route path="/layer1/how-it-works" element={<HowItWorksPathway />} />
              <Route path="/layer1/clinical-tools" element={<ClinicalToolsPathway />} />
              <Route path="/layer1/earnings" element={<EarningsPathway />} />

              {/* Layer 2: Earnings & Patient Flow */}
              <Route path="/layer2/getting-patients" element={<GettingPatientsPathway />} />
              <Route path="/layer2/bring-patients" element={<BringPatientsPathway />} />
              <Route path="/layer2/professional-identity" element={<ProfessionalIdentityPathway />} />
              <Route path="/layer2/local-awareness" element={<LocalAwarenessPathway />} />

              {/* Layer 3: Network Expansion */}
              <Route path="/layer3/invite-physios" element={<InvitePhysiosPathway />} />
              <Route path="/layer3/clinic-connection" element={<ClinicConnectionPathway />} />
              <Route path="/layer3/specialist-profile" element={<SpecialistProfilePathway />} />

              {/* Layer 4: Corporate Growth */}
              <Route path="/layer4/wellness-partner" element={<WellnessPartnerPathway />} />
              <Route path="/layer4/corporate-readiness" element={<CorporateReadinessPathway />} />
              <Route path="/layer4/share-leads" element={<ShareLeadsPathway />} />
              <Route path="/layer4/assisted-onboarding" element={<AssistedOnboardingPathway />} />

              {/* Layer 5: Community */}
              <Route path="/layer5/community" element={<CommunityPathway />} />
              <Route path="/layer5/training" element={<TrainingPathway />} />
              <Route path="/layer5/recognition" element={<RecognitionPathway />} />

              {/* Layer 6: Mentorship */}
              <Route path="/layer6/become-mentor" element={<BecomeMentor />} />
              <Route path="/layer6/mentor-assignment" element={<MentorAssignment />} />
              <Route path="/layer6/intern-feedback" element={<InternFeedback />} />
              <Route path="/layer6/intern-graduation" element={<InternGraduation />} />

              {/* Catch-all */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </AppLayout>
        </TooltipProvider>
      </ProgressProvider>
    </React.Fragment>
  </QueryClientProvider>
);

export default App;
