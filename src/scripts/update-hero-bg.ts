import { PrismaClient } from '../generated/prisma/client';
const prisma = new PrismaClient();

async function main() {
  const heroSection = await prisma.siteContent.findUnique({
    where: { section: 'home_hero' }
  });

  if (heroSection) {
    const data = heroSection.data as any;
    data.image = '/hero-bg.png';
    await prisma.siteContent.update({
      where: { section: 'home_hero' },
      data: { data }
    });
    console.log('Updated home_hero image in database.');
  } else {
    console.log('home_hero section not found in database.');
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
