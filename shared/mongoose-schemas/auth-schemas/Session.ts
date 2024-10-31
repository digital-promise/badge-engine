import { type Model, Schema, model } from "mongoose";

export interface ISession {
  sessionToken: string;
  userId: Schema.Types.ObjectId;
  expires: Date;
  createdAt: Date;
  updatedAt: Date;
}

/**
 * Put all user instance methods in this interface:
 * @see https://mongoosejs.com/docs/typescript/statics-and-methods.html
 */

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface ISessionMethods {}

// Create a new Model type that knows about ISessionMethods
type SessionModel = Model<ISession, object, ISessionMethods>;

const sessionSchema = new Schema<ISession, SessionModel, ISessionMethods>(
  {
    sessionToken: {
      type: String,
      required: true,
      unique: true,
    },
    userId: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    expires: {
      type: Date,
      required: true,
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

export default model<ISession, SessionModel>("Session", sessionSchema);
