import { InferSchemaType, model, Schema } from "mongoose";

const QuoteSchema = new Schema({
  quote: { type: String, required: true },
  author: { type: String, required: true},
  mood: { type: String, required: true},
  rectype: { type: String, required: true}
});

type Quote = InferSchemaType<typeof QuoteSchema>;

export default model<Quote>("Quote", QuoteSchema);