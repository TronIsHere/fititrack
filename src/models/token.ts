import { Document, model, models, Schema } from "mongoose";

export interface IToken extends Document {
  email: string;
  token: string;
  expireAt: Date;
  userId: Schema.Types.ObjectId;
}

const TokenSchema: Schema = new Schema<IToken>(
  {
    email: {
      type: String,
      required: [true, "Email is required"],
      minlength: [5, "Email cannot be less than 5 characters"],
      unique: true,
    },
    token: {
      type: String,
      required: [true, "Token is required"],
      unique: true,
    },
  },
  {
    timestamps: true,
  }
);

const TokenModel = models.Token || model<IToken>("Token", TokenSchema);
export default TokenModel;
