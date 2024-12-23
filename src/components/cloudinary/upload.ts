'use server';
import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY,
  api_secret: process.env.NEXT_PUBLIC_CLOUDINARY_API_SECRET,
  secure: true,
});

export const getDynamicSignature = async (folder: string) => {
  const timeStamp = Math.round(new Date().getTime() / 1000).toString();

  if (process.env.NEXT_PUBLIC_CLOUDINARY_API_SECRET) {
    const params = {
      timestamp: timeStamp,
      folder,
      upload_preset: process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET,
    };
    const signature = cloudinary.utils.api_sign_request(
      params,
      process.env.NEXT_PUBLIC_CLOUDINARY_API_SECRET
    );
    return { timeStamp, signature };
  } else {
    throw new Error('process.env.CLOUDINARY_API_SECRET is not Provided');
  }
};

export const deleteCloudinaryImage = async (id: string) => {
  console.log('delete id xa?', id);
  try {
    await cloudinary.uploader.destroy(id);
    return {
      success: true,
      message: 'Deleted from Cloudinary',
    };
  } catch (err) {
    throw new Error("Couldn't Delete Cloudinary Image");
  }
};
