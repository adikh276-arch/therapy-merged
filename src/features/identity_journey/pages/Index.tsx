import { useState, useEffect } from "react";
import Header from "@/components/identity-journey/Header";
import CheckInCard from "@/components/identity-journey/CheckInCard";
import WeekStrip from "@/components/identity-journey/WeekStrip";
import DoneSection from "@/components/identity-journey/DoneSection";
import QuoteScreen from "@/components/identity-journey/QuoteScreen";

const getDayIndex = () => {
  const day = new Date().getDay();
  // Convert Sunday=0..Saturday=6 to Mon=0..Sun=6
  return day === 0 ? 6 : day - 1;
};

const getStartOfWeek = (date: Date) => {
  const d = new Date(date);
  const day = d.getDay();
  const diff = d.getDate() - day + (day === 0 ? -6 : 1); // Adjust when day is sunday
  const monday = new Date(d.setDate(diff));
  monday.setHours(0, 0, 0, 0);
  return monday;
};

const formatDate = (date: Date) => {
  return date.toISOString().split('T')[0];
};

const Index = () => {
  const [selected, setSelected] = useState<number | null>(null);
  const [showQuote, setShowQuote] = useState(false);
  const [viewingDate, setViewingDate] = useState(new Date());
  const [loggedDays, setLoggedDays] = useState<(number | null)[]>([null, null, null, null, null, null, null]);
  const userId = sessionStorage.getItem('user_id');

  const viewingWeekStart = formatDate(getStartOfWeek(viewingDate));
  const todayWeekStart = formatDate(getStartOfWeek(new Date()));

  useEffect(() => {
    if (userId) {
      fetch(`/identity_journey/api/progress/${userId}/${viewingWeekStart}`)
        .then(res => res.json())
        .then(data => {
          if (data.week_data) {
            const migrated = data.week_data.map((v: any) => {
              if (v === true) return 0;
              if (v === false) return null;
              return v;
            });
            setLoggedDays(migrated);
          }
        })
        .catch(err => console.error('Failed to fetch progress:', err));
    }
  }, [userId, viewingWeekStart]);

  const handleDone = async () => {
    if (selected !== null && userId) {
      const today = new Date();
      const todayIdx = getDayIndex();

      // If we are viewing the current week, update locally too
      if (viewingWeekStart === todayWeekStart) {
        const updated = [...loggedDays];
        updated[todayIdx] = selected;
        setLoggedDays(updated);
      }

      // Always fetch current week data first to make sure we don't overwrite other days accidentally
      // For simplicity in this session, we'll just assume the component has the latest current week if viewing it
      // but to be safe, we should fetch current week if not viewing it.

      let currentWeekData = loggedDays;
      if (viewingWeekStart !== todayWeekStart) {
        try {
          const res = await fetch(`/identity_journey/api/progress/${userId}/${todayWeekStart}`);
          const data = await res.json();
          currentWeekData = data.week_data;
        } catch (e) { }
      }

      const updatedToSave = [...currentWeekData];
      updatedToSave[todayIdx] = selected;

      try {
        await fetch('/identity_journey/api/progress', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            user_id: userId,
            week_start: todayWeekStart,
            week_data: updatedToSave
          }),
        });
        setShowQuote(true);
      } catch (err) {
        console.error('Failed to save progress:', err);
      }
    }
  };

  const handlePrevWeek = () => {
    const prev = new Date(viewingDate);
    prev.setDate(prev.getDate() - 7);
    setViewingDate(prev);
  };

  const handleNextWeek = () => {
    const next = new Date(viewingDate);
    next.setDate(next.getDate() + 7);
    setViewingDate(next);
  };

  const handleClose = () => {
    setShowQuote(false);
    setSelected(null);
  };

  if (showQuote && selected !== null) {
    return <QuoteScreen selectedIndex={selected} onClose={handleClose} />;
  }

  return (
    <div className="min-h-screen bg-background max-w-md mx-auto">
      <Header />
      <div className="flex flex-col gap-4 p-4">
        <CheckInCard selected={selected} onSelect={setSelected} />
        <WeekStrip
          loggedDays={loggedDays}
          viewingDate={viewingDate}
          onPrevWeek={handlePrevWeek}
          onNextWeek={handleNextWeek}
        />
      </div>
      <DoneSection enabled={selected !== null} onDone={handleDone} />
    </div>
  );
};

export default Index;
