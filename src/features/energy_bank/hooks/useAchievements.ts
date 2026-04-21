import { Achievement } from '@/lib/types';
import { useEnergyStore } from './useEnergyStore';

export function useAchievements() {
    const { dayRecord, totalDebt } = useEnergyStore();

    const allAchievements: Achievement[] = [
        {
            id: 'first-track',
            title: 'First Week Tracked',
            description: 'Tracked energy for 7 consecutive days',
            icon: '📊',
            // Mock logic: unlock if we have > 0 transactions. Real logic would check history.
            unlockedAt: dayRecord.transactions.length > 5 ? new Date().toISOString() : undefined
        },
        {
            id: 'crash-prevented',
            title: 'Crash Prevented',
            description: 'Lowest balance was < 20 but ended day > 20',
            icon: '🛡️',
            unlockedAt: (dayRecord.metrics?.lowestBalance || 100) < 20 &&
                ((dayRecord.transactions[dayRecord.transactions.length - 1]?.balanceAfter || 100) > 20)
                ? new Date().toISOString() : undefined
        },
        {
            id: 'roi-positive',
            title: 'ROI Positive',
            description: 'Active investment paying off',
            icon: '📈',
            unlockedAt: (dayRecord.activeModifiers || []).some(m => m.totalGenerated > 0) ? new Date().toISOString() : undefined
        },
        {
            id: 'debt-free',
            title: 'Debt Free Warrior',
            description: 'Maintained 0 debt',
            icon: '✨',
            unlockedAt: totalDebt === 0 ? new Date().toISOString() : undefined
        }
    ];

    const unlocked = allAchievements.filter(a => !!a.unlockedAt);
    const locked = allAchievements.filter(a => !a.unlockedAt);

    return { allAchievements, unlocked, locked };
}
