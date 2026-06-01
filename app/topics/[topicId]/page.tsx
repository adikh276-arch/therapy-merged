import { SelfCareHub } from "@/components/hub/SelfCareHub";

export const metadata = {
  title: "Self-Care Resources | TherapyMantra",
  description: "Explore topic-specific exercises, tools, and guided series for your mental wellness journey.",
};

// AUTH TEMPORARILY DISABLED FOR LOCAL UI TESTING
// TODO: Restore auth before deployment
export default async function TopicPage({
  params,
}: {
  params: Promise<{ topicId: string }>;
}) {
  const { topicId } = await params;
  return <SelfCareHub topicId={topicId} />;
}
