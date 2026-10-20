import { v2 as cloudinary } from "cloudinary";

const getCloudinary = () => {
  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME || "dwsuomu8e",
    api_key: process.env.CLOUDINARY_API_KEY || "945128554817714",
    api_secret: process.env.CLOUDINARY_API_SECRET || "nZMWDAMeLUt6UuWOG1D4JbZbdYo",
  });

  return cloudinary;
};

export default getCloudinary;
