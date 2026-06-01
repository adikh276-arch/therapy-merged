import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { SelfCareHub } from "@/components/hub/SelfCareHub";

export const metadata = {
  title: "Self-Care Resources | TherapyMantra",
  description: "Explore topic-specific exercises, tools, and guided series for your mental wellness journey.",
};

export default async function TopicPage({
  params,
}: {
  params: Promise<{ topicId: string }>;
}) {
  const cookieStore = await cookies();
  const userIdCookie = cookieStore.get("user_id");
  
  if (!userIdCookie?.value) {
    redirect("/token");
  }

  const { topicId } = await params;
  return <SelfCareHub topicId={topicId} />;
}
