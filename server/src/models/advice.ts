import { InferSchemaType, model, Schema } from "mongoose";

const AdviceSchema = new Schema({
  title: { type: String, required: true },
  description: {type: String, required: true},
  image: { type: String, required: true},
  mood: { type: String, required: true},
  rectype: { type: String, required: true}
});

type Advice = InferSchemaType<typeof AdviceSchema>;

export default model<Advice>("Advice", AdviceSchema);