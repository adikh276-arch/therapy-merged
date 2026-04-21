import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const FAQ = () => {
  const faqs = [
    {
      question: "Do I need to be a physiotherapy student?",
      answer: "No. You do not need to be a physiotherapy student. We look for people who are physically active, reliable, and good at communication. Full training is provided.",
    },
    {
      question: "Is this a full-time role?",
      answer: "No. This is a flexible role. You can choose how many sessions you want to take based on your availability.",
    },
    {
      question: "How flexible are the working hours?",
      answer: "Very flexible. Sessions are scheduled between 9 AM and 7 PM, and you can choose slots that work for you.",
    },
    {
      question: "Is this role safe?",
      answer: "Yes. All sessions are scheduled during daytime hours, and patient details are verified before visits.",
    },
    {
      question: "How are sessions assigned?",
      answer: "Sessions are assigned based on your location, availability, and preferences to minimize travel.",
    },
    {
      question: "How do payments work?",
      answer: "Payments are made bi-weekly (every two weeks) directly to your bank account.",
    },
    {
      question: "Will I receive training?",
      answer: "Yes. We provide structured training and clear instructions before you start assisting patients.",
    },
  ];

  return (
    <section id="faq" className="py-24 sm:py-32 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 left-1/4 w-72 h-72 bg-primary/[0.02] rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-primary/[0.03] rounded-full blur-3xl" />

      <div className="section-container relative z-10">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-14">
            <h2 className="section-title mb-5">Frequently asked questions</h2>
            <p className="section-subtitle mx-auto">
              Got questions? We've got answers.
            </p>
          </div>

          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem
                key={index}
                value={`item-${index}`}
                className="feature-card !p-0 overflow-hidden"
              >
                <AccordionTrigger className="px-7 py-5 text-left font-display font-semibold text-[1.05rem] hover:no-underline hover:text-primary transition-colors [&>svg]:w-5 [&>svg]:h-5 [&>svg]:text-primary">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="px-7 pb-6 text-muted-foreground text-base leading-relaxed">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
};

export default FAQ;
