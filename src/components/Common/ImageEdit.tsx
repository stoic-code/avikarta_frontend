import { CameraIcon } from 'lucide-react';
import React, { useRef, useState } from 'react';

export default function ImageEdit({
  setImg,
  img,
  initialImage,
}: {
  setImg: any;
  img: any;
  initialImage: string;
}) {
  const [preivew, setPreview] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);
  return (
    <div className="group relative inline-block h-[400px] w-[90%] cursor-pointer overflow-hidden rounded-lg sm:max-w-xl">
      <div
        onClick={() => inputRef.current?.click()}
        className="absolute z-50 flex h-[400px] w-full max-w-xl items-center justify-center rounded-lg bg-black opacity-0 transition-opacity hover:opacity-50"
      >
        <CameraIcon className="text-white" size={40} />
        <input
          type="file"
          hidden
          ref={inputRef}
          accept="image/*"
          onChange={(e) => {
            if (e.target.files) {
              const file = e.target.files[0];
              setImg(file);
              setPreview(URL.createObjectURL(file));
            }
          }}
        />
      </div>
      <img
        src={preivew ? preivew : initialImage ? initialImage : '/avatar.jpg'}
        className="h-full w-full object-cover"
        alt="pic"
      />
    </div>
  );
}
