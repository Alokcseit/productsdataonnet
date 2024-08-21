import { v2 as cloudinary } from "cloudinary";
import fs from "fs";
import dotenv from "dotenv";
dotenv.config({ path: "./.env" });
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});
// console.log(process.env.CLOUDINARY_API_KEY);
const uploadFile = async (filePath) => {
  try {
    if (!filePath) throw new Error("File path is missing");
    const response = await cloudinary.uploader.upload(filePath, {
      resource_type: "auto",
    });

    // Delete the local file
    // Use the asynchronous version to avoid blocking
    fs.promises.unlink(filePath, (unlinkError) => {
      if (unlinkError) {
        console.error("Error deleting local file:", unlinkError);
      }
    });
    return response;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export { uploadFile };