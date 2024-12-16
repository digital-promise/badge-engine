import { z } from "zod";
import { CreateAwardSchema } from "./award.schema";

export const DccCredentialStatus = z.object({
  id: z.string().url(), // url of the status list with the index position
  type: z.string(), // "StatusList2021Entry"
  statusPurpose: z.string(), // "revocation" -- currently the only supported status
  statusListIndex: z.number(), // position in list index
  statusListCredential: z.string().url(), // url of the whole status list
});

export const CreateAwardWithStatusSchema =
  DccCredentialStatus.merge(CreateAwardSchema);
