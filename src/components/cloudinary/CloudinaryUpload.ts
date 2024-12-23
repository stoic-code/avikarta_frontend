import { getDynamicSignature } from './upload';

const upload_uri = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_URL || '';
const cloudinary_api_key = process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY || '';
const cloudinary_preset =
  process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET || '';

export default async function CloudinaryUpload({
  image,
  folder,
}: {
  image: any;
  folder: string;
}) {
  try {
    if (image) {
      const { timeStamp, signature } = await getDynamicSignature(folder);

      const fd = new FormData();
      fd.append('file', image);
      fd.append('api_key', cloudinary_api_key);
      fd.append('signature', signature);
      fd.append('timestamp', timeStamp.toString());
      fd.append('folder', folder);
      fd.append('upload_preset', cloudinary_preset); // Add this line

      const res = await fetch(upload_uri, {
        method: 'POST',
        body: fd,
      });

      if (res.ok) {
        const res_data = await res.json();
        return res_data;
      } else {
        throw new Error("Couldn't upload image.");
      }
    }
  } catch (err) {
    throw new Error('Failed to upload Image.');
  }
}
