import { useState } from 'react';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';

interface QuitDateModalProps {
  open: boolean;
  onSave: (date: string) => void;
  onNotYet: () => void;
  defaultDate?: string;
  isEdit?: boolean;
}

const QuitDateModal = ({ open, onSave, onNotYet, defaultDate, isEdit }: QuitDateModalProps) => {
  const today = new Date().toISOString().split('T')[0];
  const [date, setDate] = useState(defaultDate || today);

  return (
    <Dialog open={open} onOpenChange={() => {}}>
      <DialogContent className="sm:max-w-[340px] p-6 rounded-2xl" onPointerDownOutside={e => e.preventDefault()}>
        <div className="space-y-4">
          <div>
            <h2 className="font-heading text-lg font-bold text-foreground">
              {isEdit ? 'Edit quit date' : 'When did you quit smoking?'}
            </h2>
            <p className="font-body text-[13px] text-health-muted mt-1">Your tobacco cessation date</p>
          </div>
          <input
            type="date"
            value={date}
            max={today}
            onChange={e => setDate(e.target.value)}
            className="w-full px-3 py-2.5 rounded-lg border border-border bg-card font-body text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
          />
          <Button className="w-full" onClick={() => onSave(date)}>Save</Button>
          {!isEdit && (
            <button
              onClick={onNotYet}
              className="w-full text-center text-[13px] text-health-muted font-body hover:underline"
            >
              I haven't quit yet
            </button>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default QuitDateModal;
