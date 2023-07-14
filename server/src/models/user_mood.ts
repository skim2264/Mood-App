import { InferSchemaType, model, Schema } from "mongoose";

//maybe delete timestamps?
const UserMoodSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: "User", required: true},
  day: { type: Date, require: true },
  mood: { type: String, required: true }
});

type UserMood = InferSchemaType<typeof UserMoodSchema>;

export default model<UserMood>("UserMood", UserMoodSchema);