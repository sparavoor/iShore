import { getSiteContent } from "@/lib/content";
import AboutMain from "@/components/AboutMain";

export const revalidate = 0;

export default async function AboutPage() {
    const content = await getSiteContent();

    return <AboutMain initialContent={content} />;
}
