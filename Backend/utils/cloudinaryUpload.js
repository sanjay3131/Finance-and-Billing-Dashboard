import { v2 as cloudinary } from "cloudinary";

export const uploadToCloudinary = async (
  fileBuffer,
  folderName = "uploads"
) => {
  try {
    const result = await new Promise((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream(
        { folder: folderName },
        (error, result) => {
          if (error) reject(error);
          else resolve(result);
        }
      );
      stream.end(fileBuffer);
    });
    console.log(" Cloudinary upload successful:");

    return {
      url: result.secure_url,
      public_id: result.public_id,
    };
  } catch (error) {
    console.error("Cloudinary upload error:", error);
    throw new Error("Error uploading to Cloudinary");
  }
};
