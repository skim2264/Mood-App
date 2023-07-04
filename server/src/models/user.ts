import { InferSchemaType, model, Schema } from "mongoose";

const UserSchema = new Schema({
  name: {type: String, required: true},
  username: {type: String, required: true, unique: true},
  password: {type: String, required: true},
  userData: {type: Array},
  moodsList: [{type: Schema.Types.ObjectId, ref: 'UserMood'}]
});

type User = InferSchemaType<typeof UserSchema>;

export default model<User>("User", UserSchema);