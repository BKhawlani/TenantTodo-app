import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import cloudinary from "../utils/cloudinary.js";

const allowedFormats = ["jpg", "jpeg", "png", "webp"];

const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "tenant_users",
    allowed_formats: allowedFormats,
    transformation: [{ width: 400, height: 400, crop: "fill" }],
  },
});

const upload = multer({ storage });

export default upload;
