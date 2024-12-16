import { z } from "zod";
import { AchievementType, AssessmentPlacement } from "@prisma/client";
import { nonEmptyString } from "./functions";

export const AwardTargetSchema = z.object({
    name: nonEmptyString(),
})

