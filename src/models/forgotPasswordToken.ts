import { Document, model, models, Schema } from "mongoose";

export interface IForgotPasswordToken extends Document {
  email: string;
  token: string;
  expireAt: Date;
}

const ForgotPasswordTokenSchema: Schema = new Schema<IForgotPasswordToken>(
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

const ForgotPasswordModel =
  models.ForgotPasswordToken ||
  model<IForgotPasswordToken>("ForgotPasswordToken", ForgotPasswordTokenSchema);
export default ForgotPasswordModel;
