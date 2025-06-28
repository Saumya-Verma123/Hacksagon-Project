import React from 'react'
import Navbar from '../pages/Navbar'
import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { IoCameraReverseOutline } from "react-icons/io5";
import { MdOutlineUploadFile } from "react-icons/md";
import { img } from '../assets/asset'

const ScanImage = () => {
  const [uploadOption, setUploadOption] = useState(false);
  const navigate = useNavigate()
  const fileInputRef = useRef(null);
  const [isUploading, setIsUploading] = useState(false);

  //FUNCTION TO SHOW UPLOAD OPTIONS
  const showUploadOptions = () => {
    setUploadOption(prev => !prev)

  }
  const useWebcam = () => {
    navigate('/webcam');
  }
  
  const handleFileClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = async () => {
        const base64ImageWithPrefix = reader.result; // keep full string
        await uploadImageToBackend(base64ImageWithPrefix);
      };
      reader.readAsDataURL(file); // gives: data:image/jpeg;base64,...
    }
  };
  // Upload image to backend
  const uploadImageToBackend = async (base64Image) => {
    if (!base64Image) return;

    setIsUploading(true);
    try {
      const response = await fetch('http://127.0.0.1:5000/upload', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ image: base64Image }),
      });

      const data = await response.json();
      console.log('Server Response:', data);

      alert('Image uploaded successfully!');
      // navigate('/result', { state: data });
      navigate('/result', {
        state: {
          image_id: data.image_id,
          annotated_image: data.annotated_image,
          detected_objects: data.detected_objects,
        },
      });

    } catch (error) {
      console.error('Upload failed:', error);
      alert('Failed to upload image.');
    } finally {
      setIsUploading(false);
    }
  };
  return (
    <div className='flex w-screen bg-white h-full'>
      <div><Navbar /></div>

      {/* SCAN IMAGE SECTION   */}
      <div className='w-screen p-6'>
        <div className="w-[600px] mt-10 text-center mx-auto ">
          <div className='w-60%  flex items-center justify-center'
          >
            <img src={img.upload_img} alt="" />
          </div>

          {/* UPLOAD IMAGE BUTTON  */}
          <button className='mx-auto cursor-pointer text-center mt-9 p-3 px-6 shadow-md bg-linear-to-r outline-none border-none from-[#379237] to-[#82CD47] text-white font-semibold rounded-full   hover:from-[#4CAF50] hover:to-[#379237]
             transition-all duration-300 ease-in-out' onClick={showUploadOptions}><span className='text-white'> Upload Image</span></button>

          {/* UPLOAD IMAGE OPTIONS  */}
          {uploadOption && (
            <div className=' bg-gray-50 w-[300px] mx-auto mt-3 p-4 text-xl rounded-2xl shadow-md'>
              <div className='rounded-xl p-2 flex items-center bg-amber-50 gap-2.5 hover:bg-[#379237]
               hover:text-white' onClick={useWebcam}>
                <IoCameraReverseOutline /><span>Use Webcam</span>
              </div>
              <div className='p-2 rounded-xl flex items-center text-black bg-amber-50 mt-2 gap-2.5 hover:bg-[#379237]  hover:text-white' onClick={handleFileClick}>
                <MdOutlineUploadFile /><span>Select a File</span>
                {/* Hidden file input */}
                <input
                  type="file"
                  accept="image/*"
                  ref={fileInputRef}
                  style={{ display: 'none' }}
                  onChange={handleFileChange}
                />
              </div>
            </div>
          )

          }

        </div>
      </div>
    </div>
  )
}
export default ScanImage;

