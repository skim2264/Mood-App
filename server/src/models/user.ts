import { InferSchemaType, model, Schema } from "mongoose";

const UserSchema = new Schema({
  firstname: {type: String, required: true},
  lastname: {type: String},
  username: {type: String, required: true, unique: true},
  password: {type: String, required: true, select: false},
  moodsList: {type: Array}
});

type User = InferSchemaType<typeof UserSchema>;

export default model<User>("User", UserSchema);