import mongoose from "mongoose"

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    image : {type : String,required : true},
    isAdmin: { type: Boolean, default: false },
  },
  { timestamps: true }
);


export const User = mongoose.model("User", userSchema);
