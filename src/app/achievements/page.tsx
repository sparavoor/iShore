import { getSiteContent } from "@/lib/content";
import AchievementsMain from "@/components/AchievementsMain";

export const revalidate = 0;

export default async function AchievementsPage() {
    const content = await getSiteContent();

    return <AchievementsMain initialContent={content} />;
}
