import { prismaConnect } from "~/server/db/prismaConnect";

export async function getActiveBadgeTemplate() {
  const template = await prismaConnect.badgeTemplate.findFirst({
    where: {
      isActive: true,
      slug: "slim-master-competence",
    },
  });

  if (!template) {
    throw new Error("No active badge template found.");
  }

  return template;
}
