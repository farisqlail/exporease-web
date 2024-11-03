'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Input } from '@nextui-org/react';
import { uploadProductPhoto } from '../handler';

const Step3: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [uploadProgress, setUploadProgress] = useState(0);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    if (
      selectedFile &&
      (selectedFile.type === 'image/png' ||
        selectedFile.type === 'image/jpg' ||
        selectedFile.type === 'image/jpeg')
    ) {
      setFile(selectedFile);
      uploadFile(selectedFile);
    } else {
      alert('Please upload a valid image file.');
    }
  };

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    const selectedFile = event.dataTransfer.files[0];
    if (
      selectedFile &&
      (selectedFile.type === 'image/png' ||
        selectedFile.type === 'image/jpg' ||
        selectedFile.type === 'image/jpeg')
    ) {
      setFile(selectedFile);
      uploadFile(selectedFile);
    } else {
      alert('Please upload a valid image file.');
    }
  };

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
  };

  const uploadFile = (file: File) => {
    const { data, error, loading, progress } = uploadProductPhoto(file);
    console.log(progress);
    
  };

  return (
    <div className="flex flex-col gap-8 w-full min-w-[600px] sm:max-w-[512px] mx-auto justify-center items-center p-4 sm:p-6 md:p-8">
      <div className="bg-white p-3 rounded-lg shadow w-fit">
        {/* SVG Icon */}
      </div>
      <div className="text-center sm:text-center flex flex-col gap-2">
        <h3 className="text-2xl sm:text-[30px] font-semibold text-center">
          Detail produk dan foto usaha/produk
        </h3>
        <span>Berikan kami informasi foto usaha/produk yang anda miliki</span>
      </div>

      <div className="flex flex-col gap-5 w-full">
        <div className="flex flex-col">
          <label className="text-start mb-2">Nama Produk</label>
          <Input
            type="text"
            className="w-full"
            variant="bordered"
            placeholder="Masukkan nama produk usaha anda"
          />
        </div>

        <div>
          <h3 className="text-xl font-semibold mb-4">Upload File</h3>
          <div
            className="p-4 border border-gray-300 rounded-lg cursor-pointer hover:shadow-lg transition-shadow"
            onClick={() => document.getElementById('fileInput')?.click()}
            onDrop={handleDrop}
            onDragOver={handleDragOver}
          >
            <input
              id="fileInput"
              type="file"
              onChange={handleFileChange}
              className="hidden"
            />
            <p className="flex flex-col gap-3 justify-center items-center text-gray-600 text-sm sm:text-base">
              <div className="bg-white p-3 rounded-lg shadow w-fit">
                {/* SVG Icon */}
              </div>
              <span className="text-[#079455] font-semibold">
                Klik atau seret file ke sini untuk unggah
              </span>
              <br />
              SVG, PNG atau JPG (max. 10 MB)
            </p>
          </div>
          {file && (
            <div className="flex gap-3 mt-4 p-4 border border-gray-300 rounded-lg">
              <div>
                <Image
                  alt="Exporease"
                  width={56}
                  height={56}
                  className="object-cover w-[56px] h-auto"
                  src="/assets/icons/jpg-file.png"
                  loading="lazy"
                />
              </div>
              <div className="flex flex-col gap-2 w-full">
                <div className="flex justify-between">
                  <p className="font-semibold">{file.name}</p>
                  <span className="text-[#079455] font-semibold">
                    {uploadProgress.toFixed(0)}%
                  </span>
                </div>
                <div className="relative h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div
                    className="absolute h-full bg-[#079455]"
                    style={{ width: `${uploadProgress}%` }}
                  ></div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Step3;
