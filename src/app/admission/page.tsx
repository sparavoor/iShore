import { getSiteContent } from "@/lib/content";
import AdmissionMain from "@/components/AdmissionMain";

export const revalidate = 0;

export default async function AdmissionPage() {
    const content = await getSiteContent();

    return <AdmissionMain initialContent={content} />;
}
