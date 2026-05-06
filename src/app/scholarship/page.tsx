import { getSiteContent } from "@/lib/content";
import ScholarshipMain from "@/components/ScholarshipMain";

export const revalidate = 0;

export default async function ScholarshipPage() {
    const content = await getSiteContent();

    return <ScholarshipMain initialContent={content} />;
}
