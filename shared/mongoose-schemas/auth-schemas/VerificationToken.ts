import { Schema, model } from "mongoose";

/*
@see https://authjs.dev/concepts/database-models#verificationtoken
*/
export interface IVerificationToken {
  identifier: string;
  token: string;
  expires: Date;
}

const verificationTokenSchema = new Schema<IVerificationToken>({
  identifier: {
    type: String,
    required: true,
    unique: true,
  },
  token: {
    type: String,
    required: true,
    unique: true,
  },
  expires: {
    type: Date,
    required: true,
  },
});

export default model<IVerificationToken>(
  "VerificationToken",
  verificationTokenSchema,
);
