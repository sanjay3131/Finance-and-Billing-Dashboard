import multer from "multer";

// store file in memory to send directly to Cloudinary
const storage = multer.memoryStorage();
const upload = multer({ storage });

export default upload;
