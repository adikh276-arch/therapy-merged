import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import painPointsModel from '@/assets/pain-points-model.png';

interface PainPointsSectionProps {
  onSelectPainArea: (area: string) => void;
}

const painPoints = [
  {
    id: 'neck',
    label: 'Neck',
    description: 'Overcome tension & stiffness.',
    details: 'Cervical spondylosis, whiplash, and tech neck relief.',
    position: { top: '16%', left: '53%' }
  },
  {
    id: 'shoulder',
    label: 'Shoulder',
    description: 'Heal rotator cuff & posture.',
    details: 'Frozen shoulder, impingement, and injury recovery.',
    position: { top: '20%', left: '40%' }
  },
  {
    id: 'lower-back',
    label: 'Lower Back',
    description: 'Relieve sciatica & strain.',
    details: 'Herniated discs, lumbar stenosis, and chronic pain.',
    position: { top: '41%', left: '43%' }
  },
  {
    id: 'hip',
    label: 'Hip',
    description: 'Improve mobility & comfort.',
    details: 'Arthritis, bursitis, and post-op rehabilitation.',
    position: { top: '48%', left: '40%' }
  },
  {
    id: 'knee',
    label: 'Knee',
    description: 'Strengthen & stabilize.',
    details: 'ACL recovery, meniscus tears, and arthritis care.',
    position: { top: '67%', left: '79%' }
  },
  {
    id: 'ankle',
    label: 'Ankle',
    description: 'Restore balance & motion.',
    details: 'Sprains, plantar fasciitis, and stability training.',
    position: { top: '82%', left: '72%' }
  },
];

const PainPointsSection = ({ onSelectPainArea }: PainPointsSectionProps) => {
  const [activePoint, setActivePoint] = useState<string>('neck');

  const activeData = painPoints.find(p => p.id === activePoint);

  return (
    <section className="section-padding overflow-hidden relative" style={{ background: 'linear-gradient(to right, #ffffff, #fefeff)' }}>
      {/* Decorative background circle similar to reference */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/5 rounded-full blur-3xl -z-10" />

      <div className="container-padding max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">

          {/* Left Column: Heading */}
          <div className="lg:col-span-4 text-left space-y-6">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="heading-display text-4xl lg:text-5xl text-foreground font-bold leading-tight">
                From Aches to <br />
                <span className="text-foreground">Chronic Pain</span>
              </h2>
              <h3 className="text-3xl lg:text-4xl text-primary font-display font-medium mt-2">
                We've Got You <br />Covered
              </h3>
              <p className="text-muted-foreground mt-4 text-lg">
                Select a pain point to identify your issues and see how we can help you recover.
              </p>

              <div className="mt-8">
                <Button onClick={() => onSelectPainArea(activeData?.id || 'neck')} className="btn-primary">
                  Get Relief Now <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
              </div>
            </motion.div>
          </div>

          {/* Center Column: Image with Pointers */}
          <div className="lg:col-span-4 relative flex justify-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative w-full max-w-xs md:max-w-sm"
            >
              <img
                src={painPointsModel}
                alt="Human anatomy model"
                className="w-full h-auto object-contain drop-shadow-xl"
              />

              {/* Pointers */}
              {painPoints.map((point) => (
                <button
                  key={point.id}
                  onClick={() => setActivePoint(point.id)}
                  className={`absolute w-6 h-6 -ml-3 -mt-3 rounded-full border-2 transition-all duration-300 ${activePoint === point.id
                    ? 'bg-primary border-white ring-4 ring-primary/20 scale-125 z-20'
                    : 'bg-white border-primary hover:scale-110 z-10'
                    }`}
                  style={{ top: point.position.top, left: point.position.left }}
                  aria-label={`Select ${point.label}`}
                >
                  <span className="sr-only">{point.label}</span>
                  {activePoint === point.id && (
                    <span className="absolute inset-0 rounded-full animate-ping bg-primary/50" />
                  )}
                </button>
              ))}
            </motion.div>
          </div>

          {/* Right Column: List */}
          <div className="lg:col-span-4 flex flex-col justify-center h-full pl-4 lg:pl-12 border-l-2 border-border/30">
            <div className="space-y-6">
              {painPoints.map((point) => (
                <motion.div
                  key={point.id}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4 }}
                  className="relative group cursor-pointer"
                  onClick={() => setActivePoint(point.id)}
                >
                  <div className={`flex items-center space-x-4 transition-all duration-300 ${activePoint === point.id ? 'translate-x-2' : ''
                    }`}>
                    {/* Indicator Bar */}
                    <div className={`w-1.5 h-12 rounded-full transition-all duration-300 ${activePoint === point.id ? 'bg-primary scale-y-100' : 'bg-border scale-y-50 group-hover:bg-primary/50 group-hover:scale-y-75'
                      }`} />

                    <div className="flex-1">
                      <h4 className={`text-xl font-display font-medium transition-colors ${activePoint === point.id ? 'text-primary' : 'text-muted-foreground group-hover:text-primary/80'
                        }`}>
                        {point.label}
                      </h4>

                      <AnimatePresence>
                        {activePoint === point.id && (
                          <motion.div
                            initial={{ height: 0, opacity: 0, marginTop: 0 }}
                            animate={{ height: 'auto', opacity: 1, marginTop: 4 }}
                            exit={{ height: 0, opacity: 0, marginTop: 0 }}
                            className="overflow-hidden"
                          >
                            <p className="text-sm text-foreground/80 leading-relaxed">
                              {point.description}
                            </p>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default PainPointsSection;
