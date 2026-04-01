import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const template = await prisma.badgeTemplate.upsert({
    where: {
      slug: "slim-master-competence",
    },
    update: {
      name: "SLIM Master Competence",
      imagePath: "/badges/templates/slim-master-competence.png",
      isActive: true,
    },
    create: {
      slug: "slim-master-competence",
      name: "SLIM Master Competence",
      imagePath: "/badges/templates/slim-master-competence.png",
      isActive: true,
    },
  });

  console.log("Seeded badge template:");
  console.log(template);
}

main()
  .catch((error) => {
    console.error("Seeding failed:", error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
