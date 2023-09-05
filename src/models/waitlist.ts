import mongoose from "mongoose";

export interface Waitlist extends mongoose.Document {
  email: string;
}

/* PetSchema will correspond to a collection in your MongoDB database. */
const WaitlistSchema = new mongoose.Schema<Waitlist>({
  email: {
    type: String,
    required: [true, "Please provide an email"],
    maxlength: [3, "Email cannot be less than 3 characters"],
  },
});

export default mongoose.models.Waitlist ||
  mongoose.model<Waitlist>("Waitlist", WaitlistSchema);
