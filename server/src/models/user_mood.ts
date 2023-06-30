import { InferSchemaType, model, Schema } from "mongoose";

const UserMoodSchema = new Schema({
  day: { type: Date, require: true },
  mood: { type: String, required: true }
}, {timestamps: true});

type UserMood = InferSchemaType<typeof UserMoodSchema>;

export default model<UserMood>("Mood", UserMoodSchema);