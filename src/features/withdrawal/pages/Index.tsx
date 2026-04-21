import { useState, useEffect, useCallback } from 'react';
import TopBar from '@/components/TopBar';
import QuitDateModal from '@/components/QuitDateModal';
import DayCounterBanner from '@/components/DayCounterBanner';
import MilestoneCelebration from '@/components/MilestoneCelebration';
import MilestoneTimeline from '@/components/MilestoneTimeline';
import SymptomLogger from '@/components/SymptomLogger';
import CrossTrackerInsight from '@/components/CrossTrackerInsight';
import StatsRow from '@/components/StatsRow';
import ExpertBookingTrigger from '@/components/ExpertBookingTrigger';
import HistoryDrawer from '@/components/HistoryDrawer';
import { getQuitDate, setQuitDate } from '@/lib/storage';

const Index = () => {
  const [quitDate, setQuitDateState] = useState<string | null>(getQuitDate());
  const [showModal, setShowModal] = useState(!quitDate);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showHistory, setShowHistory] = useState(false);
  const [notYet, setNotYet] = useState(false);
  const [, setRefreshKey] = useState(0);

  const refresh = useCallback(() => setRefreshKey(k => k + 1), []);

  const handleSave = (date: string) => {
    setQuitDate(date);
    setQuitDateState(date);
    setShowModal(false);
    setShowEditModal(false);
  };

  const handleNotYet = () => {
    setShowModal(false);
    setNotYet(true);
  };

  if (notYet && !quitDate) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-8">
        <div className="text-center max-w-xs">
          <p className="font-body text-sm text-health-muted">
            This tracker is for after you've stopped. We'll be here when you're ready.
          </p>
          <button
            onClick={() => { setNotYet(false); setShowModal(true); }}
            className="mt-4 text-primary text-sm font-body hover:underline"
          >
            I've quit — set my date
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background pb-8 max-w-lg mx-auto">
      <TopBar onSettingsClick={() => setShowEditModal(true)} />

      {/* Quit date modals */}
      <QuitDateModal
        open={showModal}
        onSave={handleSave}
        onNotYet={handleNotYet}
      />
      <QuitDateModal
        open={showEditModal}
        onSave={handleSave}
        onNotYet={() => {}}
        defaultDate={quitDate || undefined}
        isEdit
      />

      {quitDate && (
        <>
          <MilestoneCelebration quitDate={quitDate} />
          <DayCounterBanner quitDate={quitDate} onEditDate={() => setShowEditModal(true)} />
          <StatsRow quitDate={quitDate} />
          <ExpertBookingTrigger quitDate={quitDate} />
          <CrossTrackerInsight quitDate={quitDate} />
          <MilestoneTimeline quitDate={quitDate} />
          <SymptomLogger onLogged={refresh} onViewAll={() => setShowHistory(true)} />
          <HistoryDrawer open={showHistory} onClose={() => setShowHistory(false)} quitDate={quitDate} />
        </>
      )}
    </div>
  );
};

export default Index;
