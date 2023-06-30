import app from "./app";
import env from "./util/validateEnv";
import mongoose from "mongoose";

const port = env.PORT || 5000;

//connect MongoDB
mongoose.connect(env.MONGO_URI)
  .then(() => {
    console.log("Mongoose connected.");
    //listen to port
    app.listen(port, () => {
      console.log("Server running on port: " + port);
    })
  })
  .catch(console.error);

