import React from 'react';
import { motion } from 'framer-motion';
import type { SavedCollage } from './SafePlaceApp';

interface Props {
  onClose: () => void;
}

const HistoryDrawer: React.FC<Props> = ({ onClose }) => {
  const collages: SavedCollage[] = JSON.parse(localStorage.getItem('safe-place-collages') || '[]');

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center" style={{ background: 'rgba(0,0,0,0.3)' }}>
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 40 }}
        transition={{ duration: 0.4 }}
        className="w-full mx-4 max-h-[80vh] overflow-y-auto rounded-2xl p-5"
        style={{ maxWidth: 400, backgroundColor: '#FBF7F2' }}
      >
        <div className="flex justify-between items-center mb-4">
          <h2 className="font-lora font-semibold text-lg" style={{ color: '#2C2C2A' }}>
            Past safe places
          </h2>
          <button onClick={onClose} className="font-inter text-lg" style={{ color: '#B4B2A9' }}>×</button>
        </div>

        {collages.length === 0 ? (
          <p className="font-inter text-sm text-center py-8" style={{ color: '#B4B2A9' }}>
            No saved collages yet. Complete the activity to save your first one.
          </p>
        ) : (
          <div className="flex flex-col gap-3">
            {collages.map(c => (
              <div key={c.id} className="flex gap-3 p-3 rounded-lg" style={{ border: '0.5px solid #E9E7E0' }}>
                <img src={c.imageDataURL} alt={c.name} className="w-16 h-12 rounded-md object-cover" style={{ border: '0.5px solid #E9E7E0' }} />
                <div>
                  <p className="font-lora text-sm font-medium" style={{ color: '#2C2C2A' }}>{c.name}</p>
                  <p className="font-inter text-xs" style={{ color: '#B4B2A9' }}>{c.date}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default HistoryDrawer;
