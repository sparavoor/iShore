import { getSiteContent } from "@/lib/content";
import HomeMain from "@/components/HomeMain";

// This makes the page revalidate every 10 seconds (Incremental Static Regeneration)
// Or you can set it to 0 for pure Server-Side Rendering
export const revalidate = 0; 

export default async function Home() {
  const content = await getSiteContent();

  return <HomeMain initialContent={content} />;
}
