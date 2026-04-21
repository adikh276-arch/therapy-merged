import DashboardLayout from '@/components/layout/DashboardLayout';
import Badge from '@/components/dashboard/Badge';
import LayerCard from '@/components/dashboard/LayerCard';
import PhysioBusinessScore from '@/components/dashboard/PhysioBusinessScore';
import { useProgress } from '@/contexts/ProgressContext';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { RotateCcw, GraduationCap, Award } from 'lucide-react';

const Dashboard = () => {
  const navigate = useNavigate();
  const {
    progress,
    isLayerComplete,
    isLayerUnlocked,
    getLayerProgress,
    resetProgress,
  } = useProgress();

  const layer0Progress = getLayerProgress('layer0');
  const layer1Progress = getLayerProgress('layer1');
  const layer2Progress = getLayerProgress('layer2');
  const layer3Progress = getLayerProgress('layer3');
  const layer4Progress = getLayerProgress('layer4');
  const layer6Progress = getLayerProgress('layer6');

  const getLayer0Status = () => {
    if (isLayerComplete('layer0')) return 'complete';
    if (layer0Progress.completed > 0) return 'in-progress';
    return 'active';
  };

  const getLayer1Status = () => {
    if (isLayerComplete('layer1')) return 'complete';
    if (layer1Progress.completed > 0) return 'in-progress';
    return 'in-progress'; // default to enabled
  };

  const getLayer2Status = () => {
    if (!isLayerUnlocked('layer2')) return 'locked';
    if (isLayerComplete('layer2')) return 'complete';
    if (layer2Progress.completed > 0) return 'in-progress';
    return 'in-progress';
  };

  const getLayer3Status = () => {
    if (!isLayerUnlocked('layer3')) return 'locked';
    if (isLayerComplete('layer3')) return 'complete';
    if (layer3Progress.completed > 0) return 'in-progress';
    return 'in-progress';
  };

  const getLayer4Status = () => {
    if (!isLayerUnlocked('layer4')) return 'locked';
    if (isLayerComplete('layer4')) return 'complete';
    if (layer4Progress.completed > 0) return 'in-progress';
    return 'in-progress';
  };

  const getLayer6Status = () => {
    if (isLayerComplete('layer6')) return 'complete';
    if (layer6Progress.completed > 0) return 'in-progress';
    return 'active';
  };

  const getNextLayer0Step = () => {
    if (!progress.layer0.welcome) return 'Intern Welcome';
    if (!progress.layer0.verification) return 'Intern Verification';
    if (!progress.layer0.howItWorks) return 'How Intern Sessions Work';
    if (!progress.layer0.earnings) return 'Earnings & Expectations';
    return '';
  };

  const getNextLayer1Step = () => {
    if (!progress.layer1.welcome) return 'Welcome to PhysioMantra';
    if (!progress.layer1.verification) return 'Profile Verification';
    if (!progress.layer1.howItWorks) return 'How MantraCare Works';
    if (!progress.layer1.clinicalTools) return 'Clinical Tools Overview';
    if (!progress.layer1.earnings) return 'Earnings & Payments';
    return '';
  };

  const getNextLayer2Step = () => {
    if (!progress.layer2.gettingPatients) return 'Start Getting Patients';
    if (!progress.layer2.bringPatients) return 'Bring Your Existing Patients';
    if (!progress.layer2.professionalIdentity) return 'Professional Identity Setup';
    if (!progress.layer2.localAwareness) return 'Local Awareness & Referrals';
    return '';
  };

  const getNextLayer6Step = () => {
    if (!progress.layer6.becomeMentor) return 'Become a Mentor';
    if (!progress.layer6.mentorAssignment) return 'Mentor Assignment';
    if (!progress.layer6.internFeedback) return 'Intern Feedback Loop';
    if (!progress.layer6.internGraduation) return 'Intern Graduation';
    return '';
  };

  const handleLayer0Click = () => {
    if (!progress.layer0.welcome) navigate('/layer0/welcome');
    else if (!progress.layer0.verification) navigate('/layer0/verification');
    else if (!progress.layer0.howItWorks) navigate('/layer0/how-it-works');
    else if (!progress.layer0.earnings) navigate('/layer0/earnings');
    else navigate('/layer0/welcome');
  };

  const handleLayer1Click = () => {
    if (!progress.layer1.welcome) navigate('/layer1/welcome');
    else if (!progress.layer1.verification) navigate('/layer1/verification');
    else if (!progress.layer1.howItWorks) navigate('/layer1/how-it-works');
    else if (!progress.layer1.clinicalTools) navigate('/layer1/clinical-tools');
    else if (!progress.layer1.earnings) navigate('/layer1/earnings');
    else navigate('/layer1/welcome');
  };

  const handleLayer2Click = () => {
    if (!isLayerUnlocked('layer2')) return;
    if (!progress.layer2.gettingPatients) navigate('/layer2/getting-patients');
    else if (!progress.layer2.bringPatients) navigate('/layer2/bring-patients');
    else if (!progress.layer2.professionalIdentity) navigate('/layer2/professional-identity');
    else if (!progress.layer2.localAwareness) navigate('/layer2/local-awareness');
    else navigate('/layer2/getting-patients');
  };

  const handleLayer3Click = () => {
    if (!isLayerUnlocked('layer3')) return;
    if (!progress.layer3.invitePhysios) navigate('/layer3/invite-physios');
    else if (!progress.layer3.clinicConnection) navigate('/layer3/clinic-connection');
    else if (!progress.layer3.specialistProfile) navigate('/layer3/specialist-profile');
    else navigate('/layer3/invite-physios');
  };

  const handleLayer4Click = () => {
    if (!isLayerUnlocked('layer4')) return;
    if (!progress.layer4.wellnessPartner) navigate('/layer4/wellness-partner');
    else if (!progress.layer4.corporateReadiness) navigate('/layer4/corporate-readiness');
    else if (!progress.layer4.shareLeads) navigate('/layer4/share-leads');
    else if (!progress.layer4.assistedOnboarding) navigate('/layer4/assisted-onboarding');
    else navigate('/layer4/wellness-partner');
  };

  const handleLayer5Click = () => {
    navigate('/layer5/community');
  };

  const handleLayer6Click = () => {
    if (!progress.layer6.becomeMentor) navigate('/layer6/become-mentor');
    else if (!progress.layer6.mentorAssignment) navigate('/layer6/mentor-assignment');
    else if (!progress.layer6.internFeedback) navigate('/layer6/intern-feedback');
    else if (!progress.layer6.internGraduation) navigate('/layer6/intern-graduation');
    else navigate('/layer6/become-mentor');
  };

  return (
    <DashboardLayout>
      <div className="max-w-3xl mx-auto px-6 py-12 space-y-12">
        {/* Header - Enhanced */}
        <div className="space-y-8 text-center relative z-10">
          <div className="inline-flex items-center justify-center p-4 bg-gradient-to-br from-primary/20 to-accent/20 rounded-3xl mb-2 backdrop-blur-sm border border-white/50 shadow-inner">
            <span className="text-3xl font-black text-primary tracking-tighter">PM</span>
          </div>

          <div className="space-y-4">
            <h1 className="text-5xl font-extrabold tracking-tight sm:text-6xl bg-clip-text text-transparent bg-gradient-to-r from-primary via-blue-600 to-accent animate-in fade-in slide-in-from-bottom-4 duration-1000">
              PhysioMantra <br className="sm:hidden" />
              <span className="text-foreground">Provider Pathways</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Your professional roadmap to becoming a <span className="font-semibold text-primary">top-tier provider</span> and building a thriving practice.
            </p>
          </div>

          <div className="flex flex-col items-center gap-4">
            <div className="flex items-center justify-center gap-3 flex-wrap">
              {isLayerComplete('layer1') && <Badge label="Verified Physio" variant="verified" />}
              {isLayerComplete('layer2') && <Badge label="Patient Builder" variant="special" />}
              {isLayerComplete('layer4') && <Badge label="City Health Partner" variant="partner" />}
            </div>

            {/* Physio Business Score */}
            {isLayerComplete('layer1') && <PhysioBusinessScore />}
          </div>
        </div>

        {/* Growth Journey */}
        <div className="relative pl-4 sm:pl-0">
          {/* Vertical Timeline Line */}
          <div className="absolute left-[24px] sm:left-[28px] top-6 bottom-6 w-[2px] bg-gradient-to-b from-primary/20 via-primary/40 to-primary/20 -z-10 hidden sm:block"></div>

          <div className="space-y-8">
            <LayerCard
              layerNumber={0}
              title="Intern Program (Parallel Track)"
              status={getLayer0Status()}
              progress={layer0Progress}
              nextStep={getNextLayer0Step()}
              onClick={handleLayer0Click}
              customLabel="Intern Track"
              customIcon={GraduationCap}
            />
            <LayerCard
              layerNumber={1}
              title="Foundation & Credibility"
              status={getLayer1Status()}
              progress={layer1Progress}
              nextStep={getNextLayer1Step()}
              onClick={handleLayer1Click}
            />
            <LayerCard
              layerNumber={2}
              title="Earnings & Patient Flow"
              status={getLayer2Status()}
              progress={layer2Progress}
              nextStep={getNextLayer2Step()}
              unlockCondition="Complete Layer 1"
              onClick={handleLayer2Click}
            />
            <LayerCard
              layerNumber={3}
              title="Network Expansion"
              status={getLayer3Status()}
              progress={layer3Progress}
              unlockCondition="Complete Layer 2"
              onClick={handleLayer3Click}
            />
            <LayerCard
              layerNumber={4}
              title="Corporate Growth"
              status={getLayer4Status()}
              progress={layer4Progress}
              unlockCondition="Complete Layer 2 + Trust Score >70"
              onClick={handleLayer4Click}
            />
            <LayerCard
              layerNumber={5}
              title="Community & Leadership"
              status="active" // Always visible/active for preview, or logic based on layer 4
              nextStep="Join the community"
              onClick={handleLayer5Click}
            />
            <LayerCard
              layerNumber={6}
              title="Mentorship & Leadership"
              status={getLayer6Status()}
              progress={layer6Progress}
              nextStep={getNextLayer6Step()}
              onClick={handleLayer6Click}
              customLabel="Mentorship Program"
              customIcon={Award}
            />
          </div>
        </div>

        <div className="flex justify-center pt-8 pb-12">
          <Button
            variant="outline"
            size="sm"
            onClick={resetProgress}
            className="text-muted-foreground hover:text-destructive hover:border-destructive transition-colors"
          >
            <RotateCcw className="w-4 h-4 mr-2" />
            Reset All Progress
          </Button>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;
