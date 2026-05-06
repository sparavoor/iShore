import { prisma } from "./prisma";
import { promises as fs } from "fs";
import path from "path";

export async function getDefaultContent() {
    try {
        const defaultDataPath = path.join(process.cwd(), "src", "data", "content.json");
        const fileContent = await fs.readFile(defaultDataPath, "utf8");
        return JSON.parse(fileContent);
    } catch (err) {
        console.error("Critical: Failed to read content.json fallback:", err);
        return { home: { hero: {}, about: { stats: [] }, programmes: { items: [] }, news: [], gallery: [], collaborators: [] } };
    }
}

export async function getSiteContent() {
    try {
        // Fetch all sections from the database
        const sections = await prisma.siteContent.findMany();

        // If database is completely empty (unseeded), fallback to content.json
        if (sections.length === 0) {
            return await getDefaultContent();
        }

        const newsItems = await prisma.newsItem.findMany({ orderBy: { createdAt: "asc" } });
        const galleryImages = await prisma.galleryImage.findMany({ orderBy: { createdAt: "asc" } });
        const achievementList = await prisma.achievement.findMany({ orderBy: { createdAt: "asc" } });

        // Build the content object matching the old JSON structure
        const sectionMap: Record<string, any> = {};
        for (const s of sections) {
            sectionMap[s.section] = s.data;
        }

        const homeData = sectionMap["home"] || {};

        const content: any = {
            home: {
                hero: sectionMap["home_hero"] || homeData.hero || {},
                about: sectionMap["home_about"] || homeData.about || { stats: [] },
                philosophy: sectionMap["home_philosophy"] || homeData.philosophy || {},
                programmes: sectionMap["home_programmes"] || homeData.programmes || { items: [] },
                collaborators: sectionMap["home_collaborators"] || homeData.collaborators || [],
                testimonials: sectionMap["home_testimonials"] || homeData.testimonials || (homeData.testimonial ? [homeData.testimonial] : []),
                news: newsItems.map((n) => ({
                    id: n.id,
                    title: n.title,
                    date: n.date,
                    img: n.img,
                    content: n.content,
                })),
                gallery: galleryImages.map((g) => ({
                    id: g.id,
                    url: g.url,
                })),
            },
            about: sectionMap["about"] || {},
            achievements: achievementList.map((a) => ({
                id: a.id,
                title: a.title,
                date: a.date,
                img: a.img,
                description: a.description,
            })),
            contact: sectionMap["contact"] || {},
            studentPortal: sectionMap["studentPortal"] || {},
            principal: sectionMap["principal"] || {},
            markaz: sectionMap["markaz"] || {},
            videos: sectionMap["videos"] || [],
        };

        return content;
    } catch (error) {
        console.error("Prisma lookup failed, falling back to JSON:", error);
        return await getDefaultContent();
    }
}
