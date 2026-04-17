import { ReactNode } from "react";

interface Props {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  multiline?: boolean;
}

const ActivityInput = ({ label, value, onChange, placeholder, multiline }: Props) => (
  <div className="space-y-2 text-center w-full">
    <label className="text-sm font-medium text-foreground font-heading block">{label}</label>
    {multiline ? (
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        rows={3}
        className="w-full rounded-lg bg-card px-4 py-3.5 text-foreground placeholder:text-placeholder border-none outline-none focus:ring-2 focus:ring-primary/40 resize-none font-body text-center"
      />
    ) : (
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full rounded-lg bg-card px-4 py-3.5 text-foreground placeholder:text-placeholder border-none outline-none focus:ring-2 focus:ring-primary/40 font-body text-center"
      />
    )}
  </div>
);

export default ActivityInput;
