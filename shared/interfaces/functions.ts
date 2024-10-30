import { z } from "zod";

export const nonEmptyString = (
  min = 1,
  message = "This is a required field.",
) => z.string().trim().min(min, { message });
