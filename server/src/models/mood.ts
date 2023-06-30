import { InferSchemaType, model, Schema } from "mongoose";

const MoodSchema = new Schema({
  mood: { type: String, required: true },
  recommendations: { type: Array, required: true}
}, {timestamps: true});

type Mood = InferSchemaType<typeof MoodSchema>;

export default model<Mood>("Mood", MoodSchema);