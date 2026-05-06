import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { promises as fs } from "fs";
import path from "path";

export const dynamic = "force-dynamic";

async function getDefaultContent() {
    try {
        const defaultDataPath = path.join(process.cwd(), "src", "data", "content.json");
        const fileContent = await fs.readFile(defaultDataPath, "utf8");
        return JSON.parse(fileContent);
    } catch (err) {
        console.error("Critical: Failed to read content.json fallback:", err);
        return { home: { hero: {}, about: { stats: [] }, programmes: { items: [] }, news: [], gallery: [], collaborators: [] } };
    }
}

export async function GET() {
    try {
        // Fetch all sections from the database
        const sections = await prisma.siteContent.findMany();

        // If database is completely empty (unseeded), fallback to content.json
        if (sections.length === 0) {
            const defaultDataPath = path.join(process.cwd(), "src", "data", "content.json");
            const fileContent = await fs.readFile(defaultDataPath, "utf8");
            return NextResponse.json(JSON.parse(fileContent));
        }

        const newsItems = await prisma.newsItem.findMany({ orderBy: { createdAt: "asc" } });
        const galleryImages = await prisma.galleryImage.findMany({ orderBy: { createdAt: "asc" } });
        const achievementList = await prisma.achievement.findMany({ orderBy: { createdAt: "asc" } });

        // Build the content object matching the old JSON structure
        const sectionMap: Record<string, any> = {};
        for (const s of sections) {
            sectionMap[s.section] = s.data;
        }

        // Deep merge logic simplified: use individual section keys if they exist, otherwise fallback to root 'home' if it was stored as a whole.
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

        return NextResponse.json(content);
    } catch (error) {
        console.error("Prisma lookup failed, falling back to JSON:", error);
        const fallbackContent = await getDefaultContent();
        return NextResponse.json(fallbackContent);
    }
}

export async function POST(request: Request) {
    try {
        const newContent = await request.json();

        // Update SiteContent sections
        const sectionUpdates: { section: string; data: any }[] = [
            { section: "home_hero", data: newContent.home?.hero },
            { section: "home_about", data: newContent.home?.about },
            { section: "home_philosophy", data: newContent.home?.philosophy },
            { section: "home_programmes", data: newContent.home?.programmes },
            { section: "home_collaborators", data: newContent.home?.collaborators },
            { section: "home_testimonials", data: newContent.home?.testimonials },
            { section: "about", data: newContent.about },
            { section: "contact", data: newContent.contact },
            { section: "principal", data: newContent.principal },
            { section: "markaz", data: newContent.markaz },
            { section: "studentPortal", data: newContent.studentPortal },
            { section: "videos", data: newContent.videos },
        ];

        for (const s of sectionUpdates) {
            if (s.data !== undefined) {
                await prisma.siteContent.upsert({
                    where: { section: s.section },
                    update: { data: s.data },
                    create: { section: s.section, data: s.data },
                });
            }
        }

        // Update News Items — full replacement
        if (newContent.home?.news) {
            // Get existing IDs
            const existing = await prisma.newsItem.findMany({ select: { id: true } });
            const existingIds = new Set(existing.map((n) => n.id));
            const newIds = new Set(newContent.home.news.map((n: any) => n.id).filter(Boolean));

            // Delete removed items
            for (const id of existingIds) {
                if (!newIds.has(id)) {
                    await prisma.newsItem.delete({ where: { id } });
                }
            }

            // Upsert all items
            for (const news of newContent.home.news) {
                if (news.id) {
                    await prisma.newsItem.upsert({
                        where: { id: news.id },
                        update: { title: news.title, date: news.date, img: news.img, content: news.content },
                        create: { id: news.id, title: news.title, date: news.date, img: news.img, content: news.content },
                    });
                } else {
                    await prisma.newsItem.create({
                        data: { title: news.title, date: news.date, img: news.img, content: news.content },
                    });
                }
            }
        }

        // Update Gallery Images — full replacement
        if (newContent.home?.gallery) {
            await prisma.galleryImage.deleteMany();
            for (const img of newContent.home.gallery) {
                await prisma.galleryImage.create({
                    data: { url: img.url },
                });
            }
        }

        // Update Achievements — full replacement
        if (newContent.achievements) {
            await prisma.achievement.deleteMany();
            for (const a of newContent.achievements) {
                await prisma.achievement.create({
                    data: {
                        title: a.title || "",
                        date: a.date || "",
                        img: a.img || "",
                        description: a.description || "",
                    },
                });
            }
        }

        return NextResponse.json({ success: true });
    } catch (error: any) {
        console.error("Failed to update content:", error);
        return NextResponse.json({ error: "Failed to update content", details: error?.message || String(error) }, { status: 500 });
    }
}
