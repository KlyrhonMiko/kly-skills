import { getSkillsList } from "@/lib/skills";
import { HomeClient } from "@/components/home/HomeClient";

export const dynamic = "force-dynamic";

export default async function Home() {
  const skills = await getSkillsList();
  
  return <HomeClient skills={skills} />;
}
