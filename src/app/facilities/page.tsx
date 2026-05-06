import { getSiteContent } from "@/lib/content";
import FacilitiesMain from "@/components/FacilitiesMain";

export const revalidate = 0;

export default async function FacilitiesPage() {
    const content = await getSiteContent();

    return <FacilitiesMain initialContent={content} />;
}
