import { useEffect, useState } from "react";

const MESSAGES = [
  "That's 11 minutes affected",
  "11 minutes you won't get back",
  "Your body needs 11 minutes to recover",
  "Each one takes 11 minutes from your life",
  "11 minutes less with the people you love",
];

interface ImpactMessageProps {
  triggerKey: number; // changes to trigger a new message
}

export default function ImpactMessage({ triggerKey }: ImpactMessageProps) {
  const [visible, setVisible] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (triggerKey === 0) return;
    const msg = MESSAGES[triggerKey % MESSAGES.length];
    setMessage(msg);
    setVisible(true);
    const t = setTimeout(() => setVisible(false), 4000);
    return () => clearTimeout(t);
  }, [triggerKey]);

  if (!visible) return null;

  return (
    <div className="mx-auto max-w-xs rounded-xl px-4 py-3 text-center bg-warning-soft text-warning-foreground impact-message">
      <p className="text-sm font-medium">{message}</p>
    </div>
  );
}
