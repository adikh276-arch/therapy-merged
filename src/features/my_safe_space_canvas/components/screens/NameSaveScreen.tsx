import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Save, Image as ImageIcon, ChevronRight } from 'lucide-react';

interface Props {
  getCanvasDataURL: () => string;
  onSave: (name: string, reflection: string) => void;
}

const NameSaveScreen: React.FC<Props> = ({ getCanvasDataURL, onSave }) => {
  const [name, setName] = useState('');
  const [reflection, setReflection] = useState('');
  const [imageURL, setImageURL] = useState('');

  useEffect(() => {
    setImageURL(getCanvasDataURL());
  }, [getCanvasDataURL]);

  return (
    <div className="flex flex-col items-center py-8 px-6 gap-8 max-w-lg mx-auto">
      <div className="text-center space-y-4">
        <h2 className="text-3xl font-black text-slate-900 leading-tight">Preserve your safe place</h2>
        <p className="text-slate-500 font-medium">Give your creation a name and a brief reflection.</p>
      </div>

      {/* Preview */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full relative group"
      >
        {imageURL ? (
          <div className="relative">
            <img
              src={imageURL}
              alt="Your safe place collage"
              className="w-full object-cover rounded-[2rem] shadow-2xl border border-slate-100"
              style={{ height: 240 }}
            />
            <div className="absolute inset-0 rounded-[2rem] ring-1 ring-inset ring-slate-900/10" />
          </div>
        ) : (
          <div className="w-full h-60 bg-slate-50 rounded-[2rem] flex flex-col items-center justify-center text-slate-300 gap-2 border-2 border-dashed border-slate-200">
            <ImageIcon size={48} strokeWidth={1.5} />
            <span className="text-sm font-bold uppercase tracking-widest">Generating Preview...</span>
          </div>
        )}
      </motion.div>

      {/* Name input */}
      <div className="w-full space-y-2">
        <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 px-1">
          What do you call this place?
        </label>
        <input
          type="text"
          value={name}
          onChange={e => setName(e.target.value)}
          placeholder="e.g., My Sunday Meadow"
          className="w-full py-4 px-6 rounded-2xl border-2 border-slate-100 bg-slate-50 text-lg font-bold text-slate-900 focus:outline-none focus:border-primary/30 focus:bg-white transition-all shadow-sm"
        />
      </div>

      {/* Reflection */}
      <div className="w-full space-y-2">
        <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 px-1">
          Why does this place matter? (Optional)
        </label>
        <textarea
          value={reflection}
          onChange={e => setReflection(e.target.value)}
          rows={3}
          placeholder="One gentle sentence..."
          className="w-full p-6 rounded-2xl border-2 border-slate-100 bg-slate-50 text-slate-600 font-medium focus:outline-none focus:border-primary/30 focus:bg-white transition-all resize-none shadow-sm"
        />
        <p className="text-[10px] text-slate-400 font-medium px-1 flex items-center gap-1">
          <span>✨</span> This stays private — only visible to you and your therapist.
        </p>
      </div>

      {/* Buttons */}
      <div className="w-full pt-4">
        <button
          onClick={() => onSave(name || 'My Safe Place', reflection)}
          className="w-full py-5 rounded-2xl bg-slate-900 text-white font-black text-lg hover:bg-slate-800 transition-all flex items-center justify-center gap-3 shadow-2xl shadow-slate-900/20"
        >
          Save My Safe Place
          <Save size={20} strokeWidth={3} />
        </button>
      </div>
    </div>
  );
};

export default NameSaveScreen;
