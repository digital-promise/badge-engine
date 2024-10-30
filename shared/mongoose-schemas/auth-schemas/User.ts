import { type Model, Schema, model } from "mongoose";

export interface IUser {
  name?: string | null;
  email: string;
  emailVerifiedDate?: Date | null;
  image?: string | null;
  role?: string[] | null;
  isSuperUser: boolean;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
  lastLogin: Date;
}

/**
 * Put all user instance methods in this interface:
 * @see https://mongoosejs.com/docs/typescript/statics-and-methods.html
 */

interface IUserMethods {
  fullName(): string;
}

// Create a new Model type that knows about IUserMethods
type UserModel = Model<IUser, object, IUserMethods>;

const userSchema = new Schema<IUser, UserModel, IUserMethods>(
  {
    name: {
      type: String,
    },
    email: {
      type: String,
      required: true,
      /** Will need to be careful about duplicate documents.  No support for `dropDups` so they will need to be manually removed if the unique constraint fails. */
      unique: true,
    },
    emailVerifiedDate: {
      type: Date,
      default: null,
    },
    image: {
      type: String,
    },
    role: {
      type: [String],
    },
    isSuperUser: {
      type: Boolean,
      required: true,
      default: false,
    },
    isActive: {
      type: Boolean,
      required: true,
      default: true,
    },
    createdAt: {
      type: Date,
      default: () => Date.now(),
      immutable: true,
    },
    updatedAt: Date,
    lastLogin: {
      type: Date,
      required: true,
      // TODO: validate that this is entered in ISO format
      // default: new Date(Date.now()),
      default: () => Date.now(),
    },
  },
  /**
   * Adding { timestamps: true } will add createdAt and updatedAt automatically.  Doesn't work with virtuals.
   * @see https://mongoosejs.com/docs/timestamps.html
   * */
  {
    timestamps: true,
  },
);

// Add schema methods here that were defined above

const User = model<IUser, UserModel>("User", userSchema);

export default User;
