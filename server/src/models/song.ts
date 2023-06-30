import { InferSchemaType, model, Schema } from "mongoose";

const SongSchema = new Schema({
  name: { type: String, required: true },
  artist: { type: String, required: true},
  link: { type: String, required: true},
  mood: { type: String, required: true},
  type: { type: String, required: true}
});

type Song = InferSchemaType<typeof SongSchema>;

export default model<Song>("Song", SongSchema);