import { PrismaClient } from '../src/generated/prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import pg from 'pg';
import fs from 'fs';
import path from 'path';

const pool = new pg.Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false },
});
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function main() {
  const dataPath = path.join(process.cwd(), 'src', 'data', 'content.json');
  const content = JSON.parse(fs.readFileSync(dataPath, 'utf8'));

  console.log('Seeding site_content...');
  const sections = [
    { section: 'home_hero', data: content.home?.hero },
    { section: 'home_about', data: content.home?.about },
    { section: 'home_philosophy', data: content.home?.philosophy },
    { section: 'home_programmes', data: content.home?.programmes },
    { section: 'home_collaborators', data: content.home?.collaborators },
    { section: 'home_testimonial', data: content.home?.testimonial },
    { section: 'about', data: content.about },
    { section: 'contact', data: content.contact },
    { section: 'principal', data: content.principal },
    { section: 'markaz', data: content.markaz },
    { section: 'studentPortal', data: content.studentPortal },
  ];

  for (const s of sections) {
    if (s.data) {
      await prisma.siteContent.upsert({
        where: { section: s.section },
        update: { data: s.data },
        create: { section: s.section, data: s.data },
      });
    }
  }

  console.log('Seeding achievements...');
  if (content.achievements) {
    await prisma.achievement.deleteMany();
    for (const a of content.achievements) {
      await prisma.achievement.create({
        data: {
          title: a.title,
          date: a.date,
          img: a.img,
          description: a.description,
        },
      });
    }
  }

  console.log('Seed completed successfully');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
