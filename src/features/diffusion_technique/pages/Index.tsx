import { useState } from "react";
import { useTranslation } from "react-i18next";
import { AnimatePresence } from "framer-motion";
import { ScreenWrapper } from "../components/ScreenWrapper";
import { ActivityCard } from "../components/ActivityCard";
import { PrimaryButton } from "../components/PrimaryButton";
import { ProgressBar } from "../components/ProgressBar";
import { FullScreenSky } from "../components/FullScreenSky";
import { MoneySlider } from "../components/MoneySlider";
import { StoryNamingScreen } from "../components/StoryNamingScreen";

type View = "intro" | "choose" | "sky" | "sell" | "name";

const Index = () => {
  const { t } = useTranslation();
  const [view, setView] = useState<View>("intro");
  const [step, setStep] = useState(1);
  const [thought, setThought] = useState("");
  const [reflection, setReflection] = useState("");
  const [sellValue, setSellValue] = useState(50);
  const [storyName, setStoryName] = useState("");

  const reset = () => {
    setStep(1);
    setThought("");
    setReflection("");
    setSellValue(50);
    setStoryName("");
  };

  const finishExercise = (technique: string) => {
    // History collection removed
  };

  const renderNav = () => (
    <div className="flex justify-center mb-6">
      <button
        onClick={() => { reset(); setView("intro"); }}
        className="px-4 py-2 rounded-lg text-sm font-medium bg-primary text-primary-foreground transition-colors"
      >
        {t('nav_activity')}
      </button>
    </div>
  );



  // SKY AND CLOUD EXERCISE
  if (view === "sky") {
    const totalSteps = 5;
    return (
      <div className=" py-8" style={{ background: "linear-gradient(180deg, #EEF2FF, #E6F4FF)" }}>
        {renderNav()}
        <AnimatePresence mode="wait">
          {step === 1 && (
            <ScreenWrapper key="sky1">
              <ProgressBar current={1} total={totalSteps} />
              <ActivityCard>
                <div className="text-center mb-4"><span className="text-5xl">☁️</span></div>
                <h1 className="text-[32px] font-semibold text-foreground text-center mb-4">{t('sky_title')}</h1>
                <p className="text-base text-muted-foreground text-justify mb-2">{t('sky_intro_1')}</p>
                <p className="text-base text-muted-foreground text-justify mb-2">{t('sky_intro_2')}</p>
                <p className="text-base text-muted-foreground text-justify mb-2">{t('sky_intro_3')}</p>
                <p className="text-base text-muted-foreground text-justify mb-2">{t('sky_intro_4')}</p>
                <p className="text-base text-muted-foreground text-justify mb-6">{t('sky_intro_5')}</p>
                <PrimaryButton onClick={() => setStep(2)}>{t('btn_begin_exercise')}</PrimaryButton>
              </ActivityCard>
            </ScreenWrapper>
          )}
          {step === 2 && (
            <ScreenWrapper key="sky2">
              <ProgressBar current={2} total={totalSteps} />
              <ActivityCard>
                <h2 className="text-[22px] font-medium text-foreground text-center mb-4">{t('sky_question')}</h2>
                <p className="text-base text-muted-foreground text-justify mb-4">{t('sky_hint')}</p>
                <input
                  type="text"
                  value={thought}
                  onChange={(e) => setThought(e.target.value)}
                  placeholder={t('sky_placeholder')}
                  className="w-full border border-input rounded-lg px-4 py-3 text-base text-foreground bg-transparent focus:outline-none focus:ring-2 focus:ring-primary/50 mb-6"
                />
                <PrimaryButton onClick={() => setStep(3)} disabled={!thought.trim()}>{t('btn_place_on_cloud')}</PrimaryButton>
              </ActivityCard>
            </ScreenWrapper>
          )}
          {step === 3 && (
            <FullScreenSky key="sky3" thought={thought} onNext={() => setStep(4)} />
          )}
          {step === 4 && (
            <ScreenWrapper key="sky4">
              <ProgressBar current={4} total={totalSteps} />
              <ActivityCard>
                <h2 className="text-[22px] font-medium text-foreground text-center mb-4">{t('reflection_question')}</h2>
                <p className="text-base text-muted-foreground text-justify mb-4">{t('reflection_hint')}</p>
                <textarea
                  value={reflection}
                  onChange={(e) => setReflection(e.target.value)}
                  placeholder={t('placeholder_reflection')}
                  rows={3}
                  className="w-full border border-input rounded-lg px-4 py-3 text-base text-foreground bg-transparent focus:outline-none focus:ring-2 focus:ring-primary/50 mb-6 resize-none"
                />
                <PrimaryButton onClick={() => { finishExercise("Sky and Cloud"); setStep(5); }}>{t('btn_finish_exercise')}</PrimaryButton>
              </ActivityCard>
            </ScreenWrapper>
          )}
          {step === 5 && (
            <ScreenWrapper key="sky5">
              <SkyConclusion onTryAnother={() => { reset(); setView("choose"); }} onHome={() => { reset(); setView("intro"); }} />
            </ScreenWrapper>
          )}
        </AnimatePresence>
      </div>
    );
  }

  // SELL THE THOUGHT EXERCISE
  if (view === "sell") {
    const totalSteps = 5;
    return (
      <div className=" py-8" style={{ background: "linear-gradient(180deg, #EEF2FF, #E6F4FF)" }}>
        {renderNav()}
        <AnimatePresence mode="wait">
          {step === 1 && (
            <ScreenWrapper key="sell1">
              <ProgressBar current={1} total={totalSteps} />
              <ActivityCard>
                <div className="text-center mb-4"><span className="text-5xl">💰</span></div>
                <h1 className="text-[32px] font-semibold text-foreground text-center mb-4">{t('sell_title')}</h1>
                <p className="text-base text-muted-foreground text-justify mb-2">{t('sell_intro_1')}</p>
                <p className="text-base text-muted-foreground text-justify mb-2">{t('sell_intro_2')}</p>
                <p className="text-base text-muted-foreground text-justify mb-6">{t('sell_intro_3')}</p>
                <PrimaryButton onClick={() => setStep(2)}>{t('btn_begin_exercise')}</PrimaryButton>
              </ActivityCard>
            </ScreenWrapper>
          )}
          {step === 2 && (
            <ScreenWrapper key="sell2">
              <ProgressBar current={2} total={totalSteps} />
              <ActivityCard>
                <h2 className="text-[22px] font-medium text-foreground text-center mb-4">{t('sell_question')}</h2>
                <input
                  type="text"
                  value={thought}
                  onChange={(e) => setThought(e.target.value)}
                  placeholder={t('placeholder_sell')}
                  className="w-full border border-input rounded-lg px-4 py-3 text-base text-foreground bg-background focus:outline-none focus:ring-2 focus:ring-primary/50 mb-6"
                />
                <PrimaryButton onClick={() => setStep(3)} disabled={!thought.trim()}>{t('btn_continue')}</PrimaryButton>
              </ActivityCard>
            </ScreenWrapper>
          )}
          {step === 3 && (
            <ScreenWrapper key="sell3">
              <ProgressBar current={3} total={totalSteps} />
              <ActivityCard>
                <h2 className="text-[22px] font-medium text-foreground text-center mb-4">{t('sell_cost_question')}</h2>
                <p className="text-base text-muted-foreground text-justify mb-6">{t('sell_cost_hint')}</p>
                <MoneySlider value={sellValue} onChange={setSellValue} />
                <div className="mt-6">
                  <PrimaryButton onClick={() => setStep(4)}>{t('btn_next')}</PrimaryButton>
                </div>
              </ActivityCard>
            </ScreenWrapper>
          )}
          {step === 4 && (
            <ScreenWrapper key="sell4">
              <ProgressBar current={4} total={totalSteps} />
              <ActivityCard>
                <div className="text-center mb-4"><span className="text-5xl">{sellValue < 30 ? "🎯" : sellValue < 70 ? "🤔" : "💭"}</span></div>
                {sellValue < 30 ? (
                  <>
                    <h2 className="text-[22px] font-medium text-foreground text-center mb-4">{t('sell_result_low_title')}</h2>
                    <p className="text-base text-muted-foreground text-justify mb-2">{t('sell_result_low_desc1')}</p>
                    <p className="text-base text-muted-foreground text-justify mb-6">{t('sell_result_low_desc2')}</p>
                  </>
                ) : sellValue < 70 ? (
                  <>
                    <h2 className="text-[22px] font-medium text-foreground text-center mb-4">{t('sell_result_mid_title')}</h2>
                    <p className="text-base text-muted-foreground text-justify mb-2">{t('sell_result_mid_desc1')}</p>
                    <p className="text-base text-muted-foreground text-justify mb-6">{t('sell_result_mid_desc2')}</p>
                  </>
                ) : (
                  <>
                    <h2 className="text-[22px] font-medium text-foreground text-center mb-4">{t('sell_result_high_title')}</h2>
                    <p className="text-base text-muted-foreground text-justify mb-2">{t('sell_result_high_desc1')}</p>
                    <p className="text-base text-muted-foreground text-justify mb-6">{t('sell_result_high_desc2')}</p>
                  </>
                )}
                <PrimaryButton onClick={() => { finishExercise("Sell the Thought"); setStep(5); }}>{t('btn_finish_exercise')}</PrimaryButton>
              </ActivityCard>
            </ScreenWrapper>
          )}
          {step === 5 && (
            <ScreenWrapper key="sell5">
              <SellConclusion onTryAnother={() => { reset(); setView("choose"); }} onHome={() => { reset(); setView("intro"); }} />
            </ScreenWrapper>
          )}
        </AnimatePresence>
      </div>
    );
  }

  // NAME THE STORY EXERCISE
  if (view === "name") {
    const totalSteps = 5;
    return (
      <div className=" py-8" style={{ background: "linear-gradient(180deg, #EEF2FF, #E6F4FF)" }}>
        {renderNav()}
        <AnimatePresence mode="wait">
          {step === 1 && (
            <ScreenWrapper key="name1">
              <ProgressBar current={1} total={totalSteps} />
              <ActivityCard>
                <div className="text-center mb-4"><span className="text-5xl">📖</span></div>
                <h1 className="text-[32px] font-semibold text-foreground text-center mb-4">{t('name_title')}</h1>
                <p className="text-base text-muted-foreground text-justify mb-2">{t('name_intro_1')}</p>
                <p className="text-base text-muted-foreground text-justify mb-2">{t('name_intro_2')}</p>
                <p className="text-base text-muted-foreground text-justify mb-6">{t('name_intro_3')}</p>
                <PrimaryButton onClick={() => setStep(2)}>{t('btn_begin_exercise')}</PrimaryButton>
              </ActivityCard>
            </ScreenWrapper>
          )}
          {step === 2 && (
            <ScreenWrapper key="name2">
              <ProgressBar current={2} total={totalSteps} />
              <ActivityCard>
                <h2 className="text-[22px] font-medium text-foreground text-center mb-4">{t('name_question')}</h2>
                <input
                  type="text"
                  value={thought}
                  onChange={(e) => setThought(e.target.value)}
                  placeholder={t('placeholder_name')}
                  className="w-full border border-input rounded-lg px-4 py-3 text-base text-foreground bg-background focus:outline-none focus:ring-2 focus:ring-primary/50 mb-6"
                />
                <PrimaryButton onClick={() => setStep(3)} disabled={!thought.trim()}>{t('btn_continue_simple')}</PrimaryButton>
              </ActivityCard>
            </ScreenWrapper>
          )}
          {step === 3 && (
            <StoryNamingScreen
              key="name3"
              storyName={storyName}
              onStoryNameChange={setStoryName}
              onContinue={() => setStep(4)}
              currentStep={3}
              totalSteps={totalSteps}
            />
          )}
          {step === 4 && (
            <ScreenWrapper key="name4">
              <ProgressBar current={4} total={totalSteps} />
              <ActivityCard>
                <h2 className="text-[22px] font-medium text-foreground text-center mb-4">{t('name_step4_title')}</h2>
                <p className="text-base text-muted-foreground text-justify mb-2">{t('name_step4_desc1')}</p>
                <p className="text-base font-medium text-foreground text-center my-4 italic">{t('name_step4_phrase_prefix')} {storyName} {t('name_step4_phrase_suffix')}</p>
                <p className="text-base text-muted-foreground text-justify mb-6">{t('name_step4_desc2')}</p>
                <PrimaryButton onClick={() => { finishExercise("Name the Story"); setStep(5); }}>{t('btn_finish_exercise')}</PrimaryButton>
              </ActivityCard>
            </ScreenWrapper>
          )}
          {step === 5 && (
            <ScreenWrapper key="name5">
              <NameConclusion storyName={storyName} onTryAnother={() => { reset(); setView("choose"); }} onHome={() => { reset(); setView("intro"); }} />
            </ScreenWrapper>
          )}
        </AnimatePresence>
      </div>
    );
  }

  // INTRO & CHOOSE SCREENS
  return (
    <div className=" py-8" style={{ background: "linear-gradient(180deg, #EEF2FF, #E6F4FF)" }}>
      {renderNav()}
      <AnimatePresence mode="wait">
        {view === "intro" && (
          <ScreenWrapper key="intro">
            <ActivityCard>
              <div className="text-center mb-4"><span className="text-5xl">🧠</span></div>
              <h1 className="text-[32px] font-semibold text-foreground text-center mb-4">{t('intro_title')}</h1>
              <p className="text-base text-muted-foreground text-justify mb-2">{t('intro_desc1')}</p>
              <p className="text-base text-muted-foreground text-justify mb-2">{t('intro_desc2')}</p>
              <p className="text-base text-muted-foreground text-justify mb-6">{t('intro_desc3')}</p>
              <PrimaryButton onClick={() => setView("choose")}>{t('btn_start_activity')}</PrimaryButton>
            </ActivityCard>
          </ScreenWrapper>
        )}
        {view === "choose" && step !== 7 && (
          <ScreenWrapper key="choose">
            <h1 className="text-[32px] font-semibold text-foreground text-center mb-2">{t('choose_title')}</h1>
            <p className="text-base text-muted-foreground text-center text-justify mb-6">{t('choose_desc')}</p>
            <div className="space-y-4">
              {[
                { icon: "☁️", title: "Sky and Cloud", desc: t('card_sky_desc'), view: "sky" as View },
                { icon: "💰", title: "Sell the Thought", desc: t('card_sell_desc'), view: "sell" as View },
                { icon: "📖", title: "Name the Story", desc: t('card_name_desc'), view: "name" as View },
              ].map((card) => (
                <ActivityCard key={card.title}>
                  <div className="text-center mb-2"><span className="text-4xl">{card.icon}</span></div>
                  <h3 className="text-[22px] font-medium text-foreground text-center mb-2">{card.title}</h3>
                  <p className="text-base text-muted-foreground text-justify mb-4">{card.desc}</p>
                  <PrimaryButton onClick={() => { reset(); setView(card.view); }}>{t('btn_start_exercise')}</PrimaryButton>
                </ActivityCard>
              ))}
            </div>
          </ScreenWrapper>
        )}
      </AnimatePresence>
    </div>
  );
};

function SkyConclusion({ onTryAnother, onHome }: { onTryAnother: () => void; onHome: () => void }) {
  const { t } = useTranslation();
  return (
    <ActivityCard>
      <div className="text-center mb-4"><span className="text-5xl">☁️✨</span></div>
      <h1 className="text-[32px] font-semibold text-foreground text-center mb-4">{t('conclusion_sky_title')}</h1>
      <p className="text-base text-muted-foreground text-justify mb-2">{t('conclusion_sky_desc1')}</p>
      <p className="text-base text-muted-foreground text-justify mb-2">{t('conclusion_sky_desc2')}</p>
      <p className="text-base text-muted-foreground text-justify mb-2">{t('conclusion_sky_desc3')}</p>
      <p className="text-base text-muted-foreground text-justify mb-6">{t('conclusion_sky_desc4')}</p>
      <div className="space-y-3">
        <PrimaryButton onClick={onTryAnother}>{t('btn_try_another')}</PrimaryButton>
        <PrimaryButton variant="outline" onClick={onHome}>{t('btn_back_to_techniques')}</PrimaryButton>
      </div>
    </ActivityCard>
  );
}

function SellConclusion({ onTryAnother, onHome }: { onTryAnother: () => void; onHome: () => void }) {
  const { t } = useTranslation();
  return (
    <ActivityCard>
      <div className="text-center mb-4"><span className="text-5xl">💰✨</span></div>
      <h1 className="text-[32px] font-semibold text-foreground text-center mb-4">{t('conclusion_sell_title')}</h1>
      <p className="text-base text-muted-foreground text-justify mb-2">{t('conclusion_sell_desc1')}</p>
      <p className="text-base text-muted-foreground text-justify mb-2">{t('conclusion_sell_desc2')}</p>
      <p className="text-base text-muted-foreground text-justify mb-6">{t('conclusion_sell_desc3')}</p>
      <div className="space-y-3">
        <PrimaryButton onClick={onTryAnother}>{t('btn_try_another')}</PrimaryButton>
        <PrimaryButton variant="outline" onClick={onHome}>{t('btn_back_to_techniques')}</PrimaryButton>
      </div>
    </ActivityCard>
  );
}

function NameConclusion({ storyName, onTryAnother, onHome }: { storyName: string; onTryAnother: () => void; onHome: () => void }) {
  const { t } = useTranslation();
  return (
    <ActivityCard>
      <div className="text-center mb-4"><span className="text-5xl">📖✨</span></div>
      <h1 className="text-[32px] font-semibold text-foreground text-center mb-4">{t('conclusion_name_title')}</h1>
      <p className="text-base text-muted-foreground text-justify mb-2">{t('conclusion_name_desc1')}</p>
      <p className="text-base text-muted-foreground text-justify mb-2">{t('conclusion_name_desc2')}</p>
      <p className="text-base text-muted-foreground text-justify mb-2">{t('conclusion_name_desc3')}</p>
      <p className="text-base font-medium text-foreground text-center my-4 italic">{t('conclusion_name_phrase_prefix')} {storyName} {t('conclusion_name_phrase_suffix')}</p>
      <div className="space-y-3">
        <PrimaryButton onClick={onTryAnother}>{t('btn_try_another')}</PrimaryButton>
        <PrimaryButton variant="outline" onClick={onHome}>{t('btn_back_to_techniques')}</PrimaryButton>
      </div>
    </ActivityCard>
  );
}

export default Index;
