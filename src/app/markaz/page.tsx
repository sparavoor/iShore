import { getSiteContent } from "@/lib/content";
import MarkazMain from "@/components/MarkazMain"; // Wait, I used the wrong import name in my thought, let me check.

export const revalidate = 0;

export default async function MarkazPage() {
    const content = await getSiteContent();

    return <MarkazMain initialContent={content} />;
}
