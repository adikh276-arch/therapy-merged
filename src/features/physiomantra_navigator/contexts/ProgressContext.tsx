import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { supabase } from '@/lib/supabaseClient';
import { useSearchParams } from 'react-router-dom';
import { toast } from 'sonner';

export interface ProgressState {
  layer0: { [key: string]: boolean };
  layer1: { [key: string]: boolean };
  layer2: { [key: string]: boolean };
  layer3: { [key: string]: boolean };
  layer4: { [key: string]: boolean };
  layer5: { [key: string]: boolean };
  layer6: { [key: string]: boolean };
  primaryGoal: string | null;
  userName: string;
  userId?: string;
  role?: 'admin' | 'provider' | 'intern';
}

const initialState: ProgressState = {
  layer0: { welcome: false, verification: false, howItWorks: false, earnings: false },
  layer1: { welcome: false, verification: false, howItWorks: false, clinicalTools: false, earnings: false },
  layer2: { gettingPatients: false, bringPatients: false, professionalIdentity: false, localAwareness: false },
  layer3: { invitePhysios: false, clinicConnection: false, specialistProfile: false },
  layer4: { wellnessPartner: false, corporateReadiness: false, shareLeads: false, assistedOnboarding: false },
  layer5: { community: false, training: false, recognition: false },
  layer6: { becomeMentor: false, mentorAssignment: false, internFeedback: false, internGraduation: false },
  primaryGoal: null,
  userName: 'Guest Provider',
};

interface ProgressContextType {
  progress: ProgressState;
  completePathway: (layer: string, pathway: string, evidenceUrl?: string, details?: any) => Promise<void>;
  setPrimaryGoal: (goal: string) => void;
  isLayerComplete: (layer: string) => boolean;
  isLayerUnlocked: (layer: string) => boolean;
  getLayerProgress: (layer: string) => { completed: number; total: number };
  resetProgress: () => void;
  loading: boolean;
}

const ProgressContext = createContext<ProgressContextType | undefined>(undefined);

export const ProgressProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [searchParams] = useSearchParams();

  // NUCLEAR OPTION: Regex scan entire URL for uid
  // Matches: ?uid=xyz, &uid=xyz, etc.
  const getUidFromUrl = () => {
    const href = window.location.href;
    const match = href.match(/[?&]uid=([^&#]*)/i);
    return match ? match[1] : null;
  };

  const urlUid = getUidFromUrl();

  const [progress, setProgress] = useState<ProgressState>(initialState);
  const [loading, setLoading] = useState(true);

  // Load from DB or LocalStorage
  useEffect(() => {
    const loadProgress = async () => {
      setLoading(true);

      // Strategy 1: URL UID
      if (urlUid) {
        const cleanUid = urlUid.trim().toLowerCase(); // Normalize UID
        console.log(`[Init] detected UID: ${cleanUid}`);

        // Prevent legacy local storage conflict
        localStorage.removeItem('physiomantra_progress');

        try {
          // Fetch Profile
          const { data: profile, error: profileError } = await supabase
            .from('profiles')
            .select('*')
            .eq('id', cleanUid)
            .single();

          if (profile && !profileError) {
            toast.info(`Welcome back, ${profile.full_name || 'Provider'} (${cleanUid})`);

            // Fetch Progress
            const { data: progressData } = await supabase
              .from('pathway_progress')
              .select('*')
              .eq('user_id', cleanUid);

            const newProgress = JSON.parse(JSON.stringify(initialState));
            newProgress.userId = profile.id;
            newProgress.userName = profile.full_name || 'Provider';
            newProgress.role = profile.role;

            if (progressData) {
              progressData.forEach((row: any) => {
                if (newProgress[row.layer_id]) {
                  newProgress[row.layer_id][row.pathway_id] = row.status === 'completed';
                }
              });
            }

            setProgress(newProgress);
          } else {
            // PROFILE NOT FOUND -> CREATE IT
            console.log("Creating new profile for", cleanUid);
            toast.loading(`Creating new profile for: ${cleanUid}...`, { id: 'create-profile' });

            const { error: insertError } = await supabase.from('profiles').insert({
              id: cleanUid,
              full_name: 'New Provider',
              role: 'provider',
              email: `provider_${cleanUid.substring(0, Math.min(6, cleanUid.length))}@example.com`
            });

            if (!insertError) {
              toast.success("New Profile Created!", { id: 'create-profile' });
              const newProgress = { ...initialState, userId: cleanUid, userName: 'New Provider' };
              setProgress(newProgress);
            } else {
              console.error("Failed to create profile", insertError);
              toast.error("Failed to create profile", { description: insertError.message, id: 'create-profile' });
              // Fallback
              setProgress(initialState);
            }
          }
        } catch (e: any) {
          console.error("Supabase load error", e);
          toast.error("Database connection error");
        }
      } else {
        // Strategy 2: Fallback to LocalStorage
        const stored = localStorage.getItem('physiomantra_progress');
        if (stored) {
          try {
            const parsed = JSON.parse(stored);
            setProgress({ ...initialState, ...parsed });
          } catch (e) {
            setProgress(initialState);
          }
        }
      }
      setLoading(false);
    };

    loadProgress();
  }, [urlUid]);

  // Sync to LocalStorage (Backup)
  useEffect(() => {
    if (!urlUid) {
      localStorage.setItem('physiomantra_progress', JSON.stringify(progress));
    }
  }, [progress, urlUid]);

  const completePathway = async (layer: string, pathway: string, evidenceUrl?: string, details?: any) => {
    // 1. Optimistic Update
    const updatedProgress = {
      ...progress,
      [layer]: {
        ...progress[layer as keyof ProgressState] as any,
        [pathway]: true,
      },
    };

    setProgress(updatedProgress);

    // 2. DB Update
    if (progress.userId) {
      try {
        // A. Save Pathway Progress
        const { error: progressError } = await supabase
          .from('pathway_progress')
          .upsert({
            user_id: progress.userId,
            layer_id: layer,
            pathway_id: pathway,
            status: 'completed',
            evidence_url: evidenceUrl || null,
            details: details || null, // SAVE FORM DATA
            completed_at: new Date().toISOString()
          }, { onConflict: 'user_id,layer_id,pathway_id' });

        if (progressError) throw progressError;

        // B. Calculate and Save Business Score
        const p = updatedProgress;
        const layer1Completed = Object.values(p.layer1).every(v => v);
        const foundationScore = layer1Completed ? 30 : Math.round((Object.values(p.layer1).filter(Boolean).length / Object.keys(p.layer1).length) * 30);

        let patientFlowScore = 0;
        if (p.layer2.gettingPatients) patientFlowScore += 10;
        if (p.layer2.bringPatients) patientFlowScore += 10;
        if (p.layer2.professionalIdentity) patientFlowScore += 5;

        let outreachScore = 0;
        if (p.layer2.localAwareness) outreachScore += 10;
        if (p.layer4.corporateReadiness) outreachScore += 10;
        if (p.layer4.shareLeads) outreachScore += 5;

        let networkScore = 0;
        if (p.layer3.invitePhysios) networkScore += 10;
        if (p.layer5.community) networkScore += 10;

        const totalScore = foundationScore + patientFlowScore + outreachScore + networkScore;

        const { error: scoreError } = await supabase.from('business_scores').upsert({
          user_id: progress.userId,
          foundation_score: foundationScore,
          patient_flow_score: patientFlowScore,
          outreach_score: outreachScore,
          network_score: networkScore,
          total_score: totalScore,
          calculated_at: new Date().toISOString()
        }, { onConflict: 'user_id' });

        if (scoreError) throw scoreError;

        toast.success("Progress Saved", { description: "Synced to cloud database." });

      } catch (e: any) {
        console.error("Failed to save progress", e);
        toast.error("Save Failed", { description: e.message || "Unknown DB Error" });
      }
    }
  };

  const setPrimaryGoal = (goal: string) => {
    setProgress((prev) => ({ ...prev, primaryGoal: goal }));
  };

  const isLayerComplete = (layer: string) => {
    const layerData = (progress as any)[layer];
    if (!layerData) return false;
    return Object.values(layerData).every((v) => v === true);
  };

  const isLayerUnlocked = (layer: string) => true;

  const getLayerProgress = (layer: string) => {
    const layerData = (progress as any)[layer];
    if (!layerData) return { completed: 0, total: 0 };
    const values = Object.values(layerData);
    const completed = values.filter((v) => v === true).length;
    return { completed, total: values.length };
  };

  const resetProgress = () => {
    setProgress(initialState);
    localStorage.removeItem('physiomantra_progress');
  };

  return (
    <ProgressContext.Provider
      value={{
        progress,
        completePathway,
        setPrimaryGoal,
        isLayerComplete,
        isLayerUnlocked,
        getLayerProgress,
        resetProgress,
        loading
      }}
    >
      {children}
    </ProgressContext.Provider>
  );
};

export const useProgress = () => {
  const context = useContext(ProgressContext);
  if (!context) {
    throw new Error('useProgress must be used within a ProgressProvider');
  }
  return context;
};
