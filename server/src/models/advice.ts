import { InferSchemaType, model, Schema } from "mongoose";

const TodoSchema = new Schema({
  title: { type: String, required: true },
  description: {type: String, required: true},
  image: { type: String, required: true},
  mood: { type: String, required: true}
});

type Todo = InferSchemaType<typeof TodoSchema>;

export default model<Todo>("Todo", TodoSchema);