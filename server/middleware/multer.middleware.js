import multer from "multer"
import { CloudinaryStorage } from "multer-storage-cloudinary";
import cloudinary from "../config/cloudinary.js";

const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "mern-products",
    format: async () => "png",
    public_id: (req, file) => `${Date.now()}-${file.originalname}`,
  },
});

export const upload = multer({ storage });


