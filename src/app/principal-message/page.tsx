import { getSiteContent } from "@/lib/content";
import PrincipalMessageMain from "@/components/PrincipalMessageMain";

export const revalidate = 0;

export default async function PrincipalMessagePage() {
    const content = await getSiteContent();

    return <PrincipalMessageMain initialContent={content} />;
}
