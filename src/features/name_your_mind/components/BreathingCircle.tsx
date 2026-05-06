export default function BreathingCircle() {
  return (
    <div className="pointer-events-none fixed inset-0 overflow-hidden z-0">
      {/* Primary breathing circle */}
      <div
        className="absolute top-1/2 left-1/2 w-[320px] h-[320px] rounded-full bg-primary"
        style={{ animation: "breathe 8s ease-in-out infinite" }}
      />
      {/* Secondary ring */}
      <div
        className="absolute top-1/2 left-1/2 w-[420px] h-[420px] rounded-full border-2 border-primary"
        style={{ animation: "breatheRing 8s ease-in-out infinite 1s" }}
      />
      {/* Tertiary subtle ring */}
      <div
        className="absolute top-1/2 left-1/2 w-[520px] h-[520px] rounded-full border border-accent"
        style={{ animation: "breatheRing 8s ease-in-out infinite 2s" }}
      />
    </div>
  );
}
