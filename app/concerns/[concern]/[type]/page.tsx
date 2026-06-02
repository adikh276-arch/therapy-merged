import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { StaticContentViewerClient } from "@/components/hub/StaticContentViewerClient";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ concern: string; type: string }>;
}) {
  const { concern, type } = await params;
  return {
    title: `${concern.replace(/-/g, ' ')} ${type} | TherapyMantra`,
    description: `Read ${type} about ${concern.replace(/-/g, ' ')}.`,
  };
}

export default async function StaticContentPage({
  params,
}: {
  params: Promise<{ concern: string; type: string }>;
}) {
  const cookieStore = await cookies();
  if (!cookieStore.get("user_id")?.value) {
    redirect("/token");
  }

  const { concern, type } = await params;
  redirect(`/resources/${concern}/${type}`);
}
