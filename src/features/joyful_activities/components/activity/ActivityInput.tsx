interface Props {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  multiline?: boolean;
}

const ActivityInput = ({ label, value, onChange, placeholder, multiline }: Props) => (
  <div className="space-y-3 w-full text-left">
    <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] px-4 block">
      {label}
    </label>
    {multiline ? (
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        rows={4}
        className="w-full py-6 rounded-[2.5rem] bg-slate-50 border-2 border-transparent focus:border-primary/50 focus:bg-white transition-all outline-none px-8 font-bold text-slate-700 placeholder:text-slate-300 shadow-inner resize-none leading-relaxed"
      />
    ) : (
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full py-6 rounded-[2.5rem] bg-slate-50 border-2 border-transparent focus:border-primary/50 focus:bg-white transition-all outline-none px-8 font-bold text-slate-700 placeholder:text-slate-300 shadow-inner"
      />
    )}
  </div>
);

export default ActivityInput;
