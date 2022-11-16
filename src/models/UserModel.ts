import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  email: String,
  password: String,
});

const UserModel = mongoose.model("User", UserSchema);

export default UserModel;
