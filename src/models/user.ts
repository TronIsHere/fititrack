import { TSleep, TWeight, TWorkout } from "@/components/types/DataTypes";
import { Document, model, models, Schema } from "mongoose";

export interface IUser extends Document {
  email: string;
  age: number;
  name: string;
  password: string;
  character: { level: number; maxXP: number; xp: number };
  // workouts: TWorkout[];
  sleeps: TSleep[];
  weights: TWeight[];
}

const UserSchema: Schema = new Schema<IUser>(
  {
    email: {
      type: String,
      required: [true, "Please provide an email"],
      minlength: [5, "Email cannot be less than 5 characters"],
      unique: true,
    },
    name: {
      type: String,
      required: [true, "Please provide an name"],
    },
    age: {
      type: Number,
      required: false,
    },
    password: {
      type: String,
      required: [true, "Please provide a password"],
    },
    weights: [
      {
        date: {
          type: String,
          required: [true, "Please provide a date"],
        },
        weight: {
          type: Number,
          required: [true, "Please provide a weight"],
        },
      },
    ],
    sleeps: [
      {
        date: {
          type: String,
          required: [true, "Please provide a date"],
        },
        from: {
          type: String,
          required: [true, "Please provide a From time"],
        },
        to: {
          type: String,
          required: [true, "Please provide a To time"],
        },
      },
    ],
    character: {
      level: {
        type: Number,
        default: 1,
      },
      maxXP: {
        type: Number,
        default: 200,
      },
      xp: {
        type: Number,
        default: 0,
      },
    },
  },
  {
    timestamps: true,
  }
);

const UserModel = models.User || model<IUser>("User", UserSchema);
export default UserModel;
