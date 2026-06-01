import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { SelfCareHub } from "@/components/hub/SelfCareHub";

export default async function Home() {
  const cookieStore = await cookies();
  const userIdCookie = cookieStore.get("user_id");
  
  if (!userIdCookie?.value) {
    redirect("/token");
  }

  return <SelfCareHub />;
}
