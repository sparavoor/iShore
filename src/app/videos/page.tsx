import { getSiteContent } from "@/lib/content";
import VideosMain from "@/components/VideosMain";

export const revalidate = 0;

export default async function VideosPage() {
    const content = await getSiteContent();

    return <VideosMain initialContent={content} />;
}
