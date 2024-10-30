import { type Model, Schema, model } from "mongoose";

/**
 * Auth.js uses camelCase for its database rows while respecting the conventional snake_case formatting for OAuth-related values.
 * @see https://authjs.dev/concepts/database-models
 */

export interface IAccount {
  userId: Schema.Types.ObjectId;
  type: string;
  provider: string;
  providerAccountId: string;
  refresh_token?: string | null;
  access_token: string;
  expires_at: number;
  token_type: string;
  scope: string;
  id_token: string;
  session_state: string;
  createdAt: Date;
  updatedAt: Date;
}

/**
 * Put all user instance methods in this interface:
 * @see https://mongoosejs.com/docs/typescript/statics-and-methods.html
 */
// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface IAccountMethods {}

// Create a new Model type that knows about IAccountMethods
type AccountModel = Model<IAccount, object, IAccountMethods>;

const accountSchema = new Schema<IAccount, AccountModel, IAccountMethods>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    type: {
      type: String,
      required: true,
    },
    provider: {
      type: String,
      required: true,
    },
    providerAccountId: {
      type: String,
      required: true,
      unique: true,
    },
    refresh_token: {
      type: String,
      default: null,
    },
    access_token: {
      type: String,
      required: true,
    },
    expires_at: {
      type: Number,
      required: true,
    },
    token_type: {
      type: String,
      required: true,
    },
    scope: {
      type: String,
      required: true,
    },
    id_token: {
      type: String,
      required: true,
    },
    session_state: {
      type: String,
    },
  },
  /**
   * Adding { timestamps: true } will add createdAt and updatedAt automatically.
   * @see https://mongoosejs.com/docs/timestamps.html
   * */
  {
    timestamps: true,
  },
);

// Add schema methods here that were defined above

export default model<IAccount, AccountModel>("Account", accountSchema);
