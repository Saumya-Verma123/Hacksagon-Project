import React, { useCallback, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import WebcamCapture from 'react-webcam';

const WebcamCapture = () => {
  const webcamRef = useRef(null);
  const navigate = useNavigate();
  const [capturedImage, setCapturedImage] = useState(null);
  const [isUploading, setIsUploading] = useState(false);

  const videoConstraints = {
    width: 1280,
    height: 720,
    facingMode: "environment"
  };

  const capture = useCallback(() => {
    const imageSrc = webcamRef.current.getScreenshot();
    setCapturedImage(imageSrc);
  }, []);

  const uploadImageToBackend = async () => {
    if (!capturedImage) return;
    setIsUploading(true);

    try {
      const response = await fetch('http://127.0.0.1:5000/upload', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ image: capturedImage }),
      });

      const data = await response.json();
      console.log('Server Response:', data);
      alert('Image uploaded successfully!');
      navigate('/result', { state: data });

    } catch (error) {
      console.error('Upload failed:', error);
      alert('Failed to upload image.');
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center px-4">
      <div className="w-full max-w-4xl bg-white rounded-xl shadow-xl p-6">
        <h2 className="text-2xl font-bold mb-4 text-center text-gray-800">
          Waste Detection - Capture Image
        </h2>

        {!capturedImage ? (
          <div className="flex flex-col items-center">
            <div className="w-full md:w-[80%] mx-auto rounded-md overflow-hidden border-2 border-gray-300">
              <Webcam
                audio={false}
                ref={webcamRef}
                screenshotFormat="image/jpeg"
                videoConstraints={videoConstraints}
                className="w-full object-cover"
              />
            </div>

            <div className="flex gap-4 mt-6">
              <button
                onClick={capture}
                className="px-6 py-2 bg-amber-500 hover:bg-amber-600 text-white font-semibold rounded-lg transition"
              >
                Capture
              </button>
              <button
                onClick={() => navigate(-1)}
                className="px-6 py-2 bg-gray-300 hover:bg-gray-400 text-black font-semibold rounded-lg transition"
              >
                Back
              </button>
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center">
            <img
              src={capturedImage}
              alt="Captured"
              className="w-full md:w-[80%] rounded-lg shadow-md object-contain"
            />

            <div className="flex gap-4 mt-6">
              <button
                onClick={() => setCapturedImage(null)}
                className="px-6 py-2 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-lg transition"
              >
                Retake
              </button>
              <button
                onClick={uploadImageToBackend}
                disabled={isUploading}
                className={`px-6 py-2 ${isUploading ? 'bg-gray-400' : 'bg-green-600 hover:bg-green-700'} text-white font-semibold rounded-lg transition`}
              >
                {isUploading ? 'Uploading...' : 'Upload'}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default WebcamCapture;
