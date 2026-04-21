import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslation } from "react-i18next";

const feelings = ["feeling_anxious", "feeling_low", "feeling_frustrated", "feeling_ashamed", "feeling_overwhelmed", "feeling_neutral"];
const actions = ["action_avoid", "action_overthink", "action_procrastinate", "action_work_harder", "action_shut_down", "action_nothing_changes"];

const fadeVariants = {
  initial: { opacity: 0, y: 30, scale: 0.98 },
  animate: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as const } },
  exit: { opacity: 0, y: -20, scale: 0.98, transition: { duration: 0.3 } },
};

const staggerChildren = {
  animate: { transition: { staggerChildren: 0.08 } },
};

const childFade = {
  initial: { opacity: 0, y: 12 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.4 } },
};

const ProgressDots = ({ current, total }: { current: number; total: number }) => (
  <div className="flex gap-2.5 justify-center mb-10">
    {Array.from({ length: total }).map((_, i) => (
      <motion.div
        key={i}
        initial={false}
        animate={{
          width: i === current ? 32 : 16,
          opacity: i <= current ? 1 : 0.3,
        }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className={`h-2 rounded-full ${i === current
          ? "bg-primary"
          : i < current
            ? "bg-pastel-lavender"
            : "bg-border"
          }`}
      />
    ))}
  </div>
);

const ChipSelect = ({
  options,
  selected,
  onToggle,
  otherValue,
  onOtherChange,
  t,
}: {
  options: string[];
  selected: string[];
  onToggle: (opt: string) => void;
  otherValue: string;
  onOtherChange: (val: string) => void;
  t: any;
}) => (
  <div className="flex flex-wrap gap-2">
    {options.map((opt) => (
      <motion.button
        key={opt}
        type="button"
        whileHover={{ scale: 1.04 }}
        whileTap={{ scale: 0.97 }}
        onClick={() => onToggle(opt)}
        className={`px-4 py-2.5 rounded-full text-sm font-medium transition-all duration-300 border-2 ${selected.includes(opt)
          ? "bg-primary text-primary-foreground border-primary shadow-md"
          : "bg-card text-foreground border-border hover:border-pastel-lavender hover:bg-pastel-blue/30"
          }`}
      >
        {t(opt)}
      </motion.button>
    ))}
    <input
      type="text"
      placeholder={t("other")}
      value={otherValue}
      onChange={(e) => onOtherChange(e.target.value)}
      className="px-4 py-2.5 rounded-full text-sm border-2 border-border bg-card text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary/60 w-32 transition-colors"
    />
  </div>
);

const CTAButton = ({ onClick, disabled, children, variant = "primary" }: { onClick: () => void; disabled?: boolean; children: React.ReactNode; variant?: "primary" | "soft" }) => (
  <motion.button
    whileHover={{ scale: 1.01 }}
    whileTap={{ scale: 0.98 }}
    onClick={onClick}
    disabled={disabled}
    className={`w-full py-4 rounded-2xl font-medium text-base transition-all disabled:opacity-40 disabled:cursor-not-allowed ${variant === "primary"
      ? "bg-primary text-primary-foreground shadow-lg shadow-primary/20 hover:shadow-xl hover:shadow-primary/30"
      : "bg-pastel-lavender text-secondary-foreground hover:bg-pastel-blue"
      }`}
  >
    {children}
  </motion.button>
);

const DecorativeBlobs = ({ variant = 0 }: { variant?: number }) => {
  const positions = [
    // variant 0
    [
      { top: "-60px", right: "-40px", size: "180px", color: "bg-pastel-blue/40" },
      { bottom: "-30px", left: "-50px", size: "140px", color: "bg-pastel-lavender/30" },
    ],
    // variant 1
    [
      { top: "-40px", left: "-30px", size: "120px", color: "bg-pastel-mint/40" },
      { bottom: "-50px", right: "-40px", size: "160px", color: "bg-pastel-blue/30" },
    ],
    // variant 2
    [
      { top: "-50px", right: "-60px", size: "200px", color: "bg-pastel-lavender/35" },
      { bottom: "-40px", left: "-30px", size: "130px", color: "bg-pastel-rose/25" },
    ],
    // variant 3
    [
      { top: "-30px", left: "-50px", size: "150px", color: "bg-pastel-peach/35" },
      { bottom: "-60px", right: "-30px", size: "170px", color: "bg-pastel-lavender/30" },
    ],
    // variant 4
    [
      { top: "-50px", right: "-30px", size: "160px", color: "bg-pastel-blue/35" },
      { bottom: "-40px", left: "-40px", size: "190px", color: "bg-pastel-mint/25" },
    ],
  ];

  const blobs = positions[variant % positions.length];

  return (
    <>
      {blobs.map((blob, i) => (
        <motion.div
          key={i}
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1.2, delay: i * 0.2, ease: "easeOut" }}
          className={`absolute rounded-full blur-3xl ${blob.color} pointer-events-none`}
          style={{
            width: blob.size,
            height: blob.size,
            top: "top" in blob ? blob.top : undefined,
            bottom: "bottom" in blob ? blob.bottom : undefined,
            left: "left" in blob ? blob.left : undefined,
            right: "right" in blob ? blob.right : undefined,
          }}
        />
      ))}
    </>
  );
};

export default function MindfulActivity() {
  const { t } = useTranslation();
  const [screen, setScreen] = useState(0);
  const [thought, setThought] = useState("");
  const [selectedFeelings, setSelectedFeelings] = useState<string[]>([]);
  const [feelingOther, setFeelingOther] = useState("");
  const [selectedActions, setSelectedActions] = useState<string[]>([]);
  const [actionOther, setActionOther] = useState("");
  const [evidence, setEvidence] = useState("");
  const [reframe, setReframe] = useState("");
  const [finished, setFinished] = useState(false);

  const toggle = (list: string[], item: string) =>
    list.includes(item) ? list.filter((i) => i !== item) : [...list, item];

  const next = () => setScreen((s) => s + 1);

  const reset = () => {
    setScreen(0);
    setThought("");
    setSelectedFeelings([]);
    setFeelingOther("");
    setSelectedActions([]);
    setActionOther("");
    setEvidence("");
    setReframe("");
    setFinished(false);
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-lg">
        <ProgressDots current={screen} total={5} />

        <AnimatePresence mode="wait">
          {/* SCREEN 0 — Intro */}
          {screen === 0 && (
            <motion.div key="s0" {...fadeVariants} className="relative">
              <DecorativeBlobs variant={0} />
              <div className="relative bg-card/70 backdrop-blur-sm rounded-3xl p-8 border border-border/50 shadow-sm space-y-6">
                <h1 className="text-3xl md:text-4xl font-heading text-foreground leading-tight">
                  {t("app_title")}
                </h1>
                <motion.div variants={staggerChildren} initial="initial" animate="animate" className="space-y-4 text-foreground/80 leading-relaxed text-[15px]">
                  <motion.p variants={childFade}>
                    {t("intro_text_1")}<br />
                    {t("intro_text_2")}
                  </motion.p>
                  <motion.p variants={childFade}>{t("influence_title")}</motion.p>
                  <motion.ul variants={childFade} className="space-y-2 ml-1">
                    <li className="flex items-center gap-3">
                      <span className="w-2 h-2 rounded-full bg-pastel-blue flex-shrink-0" />{t("how_we_feel")}
                    </li>
                    <li className="flex items-center gap-3">
                      <span className="w-2 h-2 rounded-full bg-pastel-lavender flex-shrink-0" />{t("what_we_do")}
                    </li>
                    <li className="flex items-center gap-3">
                      <span className="w-2 h-2 rounded-full bg-pastel-mint flex-shrink-0" />{t("avoid_action")}
                    </li>
                  </motion.ul>
                  <motion.p variants={childFade}>{t("help_you_title")}</motion.p>
                  <motion.div variants={childFade} className="space-y-2 ml-1">
                    <div className="flex items-center gap-3">
                      <span className="w-6 h-6 rounded-full bg-pastel-blue/60 flex items-center justify-center text-xs font-semibold text-primary">1</span>
                      {t("notice_thought")}
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="w-6 h-6 rounded-full bg-pastel-lavender/60 flex items-center justify-center text-xs font-semibold text-primary">2</span>
                      {t("understand_impact")}
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="w-6 h-6 rounded-full bg-pastel-mint/60 flex items-center justify-center text-xs font-semibold text-primary">3</span>
                      {t("adjust_balanced")}
                    </div>
                  </motion.div>
                  <motion.p variants={childFade} className="italic text-muted-foreground border-l-2 border-pastel-lavender pl-4">
                    {t("not_forcing_positivity")}<br />
                    {t("gaining_clarity")}
                  </motion.p>
                  <motion.p variants={childFade} className="text-sm text-muted-foreground">
                    {t("time_required")}<br />
                    {t("no_right_wrong")}
                  </motion.p>
                </motion.div>
                <CTAButton onClick={next}>{t("start")}</CTAButton>
              </div>
            </motion.div>
          )}

          {/* SCREEN 1 — Thought */}
          {screen === 1 && (
            <motion.div key="s1" {...fadeVariants} className="relative">
              <DecorativeBlobs variant={1} />
              <div className="relative bg-card/70 backdrop-blur-sm rounded-3xl p-8 border border-border/50 shadow-sm space-y-6">
                <h1 className="text-3xl font-heading text-foreground">{t("whats_the_thought")}</h1>
                <div className="space-y-4 text-foreground/80 leading-relaxed text-[15px]">
                  <p>{t("thought_bothering")}</p>
                  <p>
                    {t("self_critical")}<br />
                    {t("overwhelming")}<br />
                    {t("completely_true")}
                  </p>
                  <p>{t("write_one_sentence")}</p>
                </div>
                <div className="space-y-2">
                  <input
                    type="text"
                    value={thought}
                    onChange={(e) => setThought(e.target.value)}
                    placeholder={t("thought_placeholder")}
                    className="w-full px-5 py-4 rounded-2xl border-2 border-border bg-background text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/40 text-[15px] transition-all"
                  />
                  <p className="text-xs text-muted-foreground ml-2">{t("no_judgment")}</p>
                </div>
                <CTAButton onClick={next} disabled={!thought.trim()}>{t("continue")}</CTAButton>
              </div>
            </motion.div>
          )}

          {/* SCREEN 2 — Impact */}
          {screen === 2 && (
            <motion.div key="s2" {...fadeVariants} className="relative">
              <DecorativeBlobs variant={2} />
              <div className="relative bg-card/70 backdrop-blur-sm rounded-3xl p-8 border border-border/50 shadow-sm space-y-6">
                <h1 className="text-3xl font-heading text-foreground">{t("affect_title")}</h1>
                <p className="text-foreground/80 text-[15px]">{t("when_you_think")}</p>
                <div className="space-y-3">
                  <p className="text-sm font-medium text-foreground">{t("feel_question")}</p>
                  <ChipSelect
                    options={feelings}
                    selected={selectedFeelings}
                    onToggle={(opt) => setSelectedFeelings(toggle(selectedFeelings, opt))}
                    otherValue={feelingOther}
                    onOtherChange={setFeelingOther}
                    t={t}
                  />
                </div>
                <div className="space-y-3">
                  <p className="text-sm font-medium text-foreground">{t("do_question")}</p>
                  <ChipSelect
                    options={actions}
                    selected={selectedActions}
                    onToggle={(opt) => setSelectedActions(toggle(selectedActions, opt))}
                    otherValue={actionOther}
                    onOtherChange={setActionOther}
                    t={t}
                  />
                </div>
                <div className="bg-pastel-blue/30 rounded-2xl p-5 space-y-1.5 border border-pastel-blue/40">
                  <p className="text-sm font-medium text-accent-foreground">{t("pattern_title")}</p>
                  <p className="text-xs text-muted-foreground">
                    {t("automatic_pattern")}<br />
                    {t("awareness_space")}
                  </p>
                </div>
                <CTAButton onClick={next} disabled={selectedFeelings.length === 0 && !feelingOther}>{t("continue")}</CTAButton>
              </div>
            </motion.div>
          )}

          {/* SCREEN 3 — Evidence */}
          {screen === 3 && (
            <motion.div key="s3" {...fadeVariants} className="relative">
              <DecorativeBlobs variant={3} />
              <div className="relative bg-card/70 backdrop-blur-sm rounded-3xl p-8 border border-border/50 shadow-sm space-y-6">
                <h1 className="text-3xl font-heading text-foreground">{t("supports_title")}</h1>
                <div className="space-y-4 text-foreground/80 leading-relaxed text-[15px]">
                  <p>{t("supports_text_1")}</p>
                  <p>{t("supports_text_2")}</p>
                  <p>{t("ask_yourself")}</p>
                  <p className="italic text-foreground/70 border-l-2 border-pastel-peach pl-4">
                    {t("valid_question")}
                  </p>
                  <p>
                    {t("no_prove_wrong")}<br />
                    {t("gently_explore")}
                  </p>
                </div>
                <div className="space-y-2">
                  <input
                    type="text"
                    value={evidence}
                    onChange={(e) => setEvidence(e.target.value)}
                    placeholder={t("evidence_placeholder")}
                    className="w-full px-5 py-4 rounded-2xl border-2 border-border bg-background text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/40 text-[15px] transition-all"
                  />
                  <p className="text-xs text-muted-foreground ml-2">{t("be_specific")}</p>
                </div>
                <div className="bg-pastel-peach/30 rounded-2xl p-4 border border-pastel-peach/40">
                  <p className="text-xs text-muted-foreground">
                    {t("evidence_logic")}
                  </p>
                </div>
                <CTAButton onClick={next} disabled={!evidence.trim()}>{t("reframe")}</CTAButton>
              </div>
            </motion.div>
          )}

          {/* SCREEN 4 — Reframe + Closing */}
          {screen === 4 && (
            <motion.div key="s4" {...fadeVariants} className="relative">
              <DecorativeBlobs variant={4} />
              {!finished ? (
                <div className="relative bg-card/70 backdrop-blur-sm rounded-3xl p-8 border border-border/50 shadow-sm space-y-6">
                  <h1 className="text-3xl font-heading text-foreground">{t("adjust_title")}</h1>
                  <div className="space-y-3 text-foreground/80 leading-relaxed text-[15px]">
                    <p>{t("adjust_intro")}</p>
                    <p>
                      {t("not_overly_positive")}<br />
                      {t("realistic_fair")}
                    </p>
                    <p>{t("balanced_often")}</p>
                    <ul className="space-y-2 ml-1">
                      <li className="flex items-center gap-3">
                        <span className="w-2 h-2 rounded-full bg-pastel-blue flex-shrink-0" />{t("acknowledges_true")}
                      </li>
                      <li className="flex items-center gap-3">
                        <span className="w-2 h-2 rounded-full bg-pastel-lavender flex-shrink-0" />{t("leaves_room")}
                      </li>
                      <li className="flex items-center gap-3">
                        <span className="w-2 h-2 rounded-full bg-pastel-mint flex-shrink-0" />{t("reduces_harsh")}
                      </li>
                    </ul>
                  </div>
                  <div className="space-y-2">
                    <input
                      type="text"
                      value={reframe}
                      onChange={(e) => setReframe(e.target.value)}
                      placeholder={t("reframe_placeholder")}
                      className="w-full px-5 py-4 rounded-2xl border-2 border-border bg-background text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/40 text-[15px] transition-all"
                    />
                    <p className="text-xs text-muted-foreground ml-2">
                      {t("reframe_hint")}<br />
                      {t("reframe_hint_2")}
                    </p>
                  </div>
                  <CTAButton onClick={() => setFinished(true)} disabled={!reframe.trim()}>{t("submit")}</CTAButton>
                </div>
              ) : (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                  className="relative"
                >
                  {/* Extra decorative elements for closing */}
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 1.5, ease: "easeOut" }}
                    className="absolute -top-20 left-1/2 -translate-x-1/2 w-64 h-64 rounded-full bg-pastel-lavender/30 blur-3xl pointer-events-none"
                  />
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 1.5, delay: 0.3, ease: "easeOut" }}
                    className="absolute -bottom-16 left-1/2 -translate-x-1/2 w-48 h-48 rounded-full bg-pastel-blue/25 blur-3xl pointer-events-none"
                  />

                  <div className="relative bg-card/80 backdrop-blur-sm rounded-3xl border border-border/50 shadow-lg overflow-hidden">
                    {/* Top accent bar */}
                    <div className="h-1.5 bg-gradient-to-r from-pastel-blue via-pastel-lavender to-pastel-mint" />

                    <div className="p-8 space-y-6">
                      {/* Breathing icon */}
                      <motion.div
                        animate={{ scale: [1, 1.15, 1] }}
                        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                        className="mx-auto w-16 h-16 rounded-full bg-pastel-lavender/50 flex items-center justify-center"
                      >
                        <div className="w-8 h-8 rounded-full bg-pastel-blue/60" />
                      </motion.div>

                      <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.4 }}
                        className="text-center text-muted-foreground italic text-[15px]"
                      >
                        {t("take_breath")}
                      </motion.p>

                      <motion.div
                        variants={staggerChildren}
                        initial="initial"
                        animate="animate"
                        className="space-y-4 text-foreground/80 leading-relaxed text-[15px]"
                      >
                        <motion.p variants={childFade}>
                          {t("still_exist")}<br />
                          {t("no_eliminate")}
                        </motion.p>

                        <motion.p variants={childFade} className="font-medium text-foreground text-base">
                          {t("powerful_practice")}
                        </motion.p>

                        <motion.div variants={childFade} className="space-y-3 py-2">
                          {[
                            { color: "bg-pastel-blue", text: t("paused") },
                            { color: "bg-pastel-lavender", text: t("looked_thought") },
                            { color: "bg-pastel-mint", text: t("explored_supports") },
                            { color: "bg-pastel-peach", text: t("understood_affect") },
                            { color: "bg-pastel-rose", text: t("chose_respond") },
                          ].map(({ color, text }, i) => (
                            <motion.div
                              key={i}
                              initial={{ opacity: 0, x: -16 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: 0.8 + i * 0.15, duration: 0.4 }}
                              className="flex items-start gap-3"
                            >
                              <span className={`w-3 h-3 rounded-full ${color} flex-shrink-0 mt-1`} />
                              <span>{text}</span>
                            </motion.div>
                          ))}
                        </motion.div>

                        <motion.div
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: 1.8 }}
                          className="bg-pastel-blue/20 rounded-2xl p-5 border border-pastel-blue/30 space-y-3"
                        >
                          <p className="font-medium text-foreground">{t("creates_space")}</p>
                          <p className="text-sm">
                            {t("small_moments")}
                          </p>
                        </motion.div>

                        <motion.div
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: 2.2 }}
                          className="text-center space-y-2 pt-2"
                        >
                          <p>
                            {t("not_change_every")}<br />
                            {t("only_notice")}
                          </p>
                          <p className="text-xl font-heading text-primary">{t("did_today")}</p>
                        </motion.div>
                      </motion.div>

                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 2.6 }}
                      >
                        <CTAButton onClick={reset} variant="soft">{t("finish")}</CTAButton>
                      </motion.div>
                    </div>
                  </div>
                </motion.div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
