import { InferSchemaType, model, Schema } from "mongoose";

const moodSchema = new Schema({
  mood: { type: String, required: true, unique: true },
  image: { type: String, required: true},
  color: { type: String, required: true},
  recommendations: { type: Array}
});

type Mood = InferSchemaType<typeof moodSchema>;

export default model<Mood>("Mood", moodSchema);