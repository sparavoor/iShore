import { getSiteContent } from "@/lib/content";
import GalleryMain from "@/components/GalleryMain";

export const revalidate = 0;

export default async function GalleryPage() {
    const content = await getSiteContent();

    return <GalleryMain initialContent={content} />;
}
