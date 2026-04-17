interface StepProgressProps {
  current: number;
  total: number;
}

const StepProgress = ({ current, total }: StepProgressProps) => {
  return (
    <div className="flex items-center gap-2 mb-6">
      {Array.from({ length: total }).map((_, i) => (
        <div
          key={i}
          className={`h-1.5 flex-1 rounded-full transition-colors duration-500 ${
            i < current ? "bg-primary" : "bg-border"
          }`}
        />
      ))}
    </div>
  );
};

export default StepProgress;
