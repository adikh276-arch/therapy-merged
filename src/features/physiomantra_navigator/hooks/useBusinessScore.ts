import { useProgress } from '@/contexts/ProgressContext';

export interface ScoreBreakdown {
    foundation: number;      // Max 30
    patientFlow: number;     // Max 25
    outreach: number;        // Max 25
    network: number;         // Max 20
    total: number;           // Max 100
}

export const useBusinessScore = (): ScoreBreakdown => {
    const { progress, isLayerComplete } = useProgress();

    // 1. Foundation Score (Max 30)
    // Simple check: Layer 1 completion gives full 30 points.
    // Alternatively, we could break it down by Layer 1 steps, but "Foundation" implies the base is set.
    const foundationScore = isLayerComplete('layer1') ? 30 :
        // Partial credit for Layer 1 steps if needed, for more dynamic feel early on
        (Object.values(progress.layer1).filter(Boolean).length / Object.keys(progress.layer1).length) * 30;

    // 2. Patient Flow Score (Max 25)
    // Derived from Layer 2: Earnings & Patient Flow
    // - Getting Patients: 10
    // - Bring Patients: 10
    // - Professional Identity: 5
    let patientFlowScore = 0;
    if (progress.layer2.gettingPatients) patientFlowScore += 10;
    if (progress.layer2.bringPatients) patientFlowScore += 10;
    if (progress.layer2.professionalIdentity) patientFlowScore += 5;

    // 3. Outreach Activity (Max 25)
    // Derived from Layer 2 (Local Awareness) & Layer 4 (Corporate/Leads)
    // - Local Awareness (Layer 2): 10
    // - Corporate Readiness (Layer 4): 10
    // - Share Leads (Layer 4): 5
    let outreachScore = 0;
    if (progress.layer2.localAwareness) outreachScore += 10;
    if (progress.layer4.corporateReadiness) outreachScore += 10;
    if (progress.layer4.shareLeads) outreachScore += 5;

    // 4. Network Contribution (Max 20)
    // Derived from Layer 3 (Network) & Layer 5 (Community)
    // - Invite Physios (Layer 3): 10
    // - Community Participation (Layer 5): 10
    let networkScore = 0;
    if (progress.layer3.invitePhysios) networkScore += 10;
    if (progress.layer5.community) networkScore += 10;

    return {
        foundation: Math.round(foundationScore),
        patientFlow: patientFlowScore,
        outreach: outreachScore,
        network: networkScore,
        total: Math.round(foundationScore + patientFlowScore + outreachScore + networkScore),
    };
};
