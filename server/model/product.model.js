import  mongoose from "mongoose"

const productSchema = new mongoose.Schema(
  {
      name: { type: String, required: true },
      description: { type: String },
      price: { type: Number, required: true },
      stock : {type : String},
      category : {type : String},
      flashsale: {Type : Boolean},
      image: { type: String, required: true },
      user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  },
  { timestamps: true }
);

export const Product = mongoose.model("Product", productSchema);
