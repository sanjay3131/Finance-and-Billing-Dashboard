import { v2 as cloudinary } from "cloudinary";

const uploadImage = async (filePath) => {
  try {
    const result = await cloudinary.uploader.upload(filePath);
    console.log("Upload result:", result);

    return result;
  } catch (error) {
    throw new Error("Error uploading image to Cloudinary");
  }
};

export default uploadImage;
