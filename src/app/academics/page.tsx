import { getSiteContent } from "@/lib/content";
import AcademicsMain from "@/components/AcademicsMain";

export const revalidate = 0;

export default async function AcademicsPage() {
    const content = await getSiteContent();

    return <AcademicsMain initialContent={content} />;
}
