"use client";
import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { motion } from "framer-motion";
import { X, UploadCloud } from "lucide-react";

const Dropzone = ({ onFileAccepted }) => {
  const [showDropzone, setShowDropzone] = useState(false);

  const onDrop = useCallback(
    (acceptedFiles) => {
      onFileAccepted(acceptedFiles);
      setShowDropzone(false); // close after accepting files
    },
    [onFileAccepted]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    multiple: true,
  });

  return (
    <div className="relative">
      {/* Trigger Button */}
      <button
        onClick={() => setShowDropzone(true)}
        className="p-3 rounded-full bg-blue-600 text-white hover:bg-blue-700 transition-all"
      >
        <UploadCloud className="w-5 h-5" />
      </button>

      {/* Dropzone Box - Centered and Double Size */}
      {showDropzone && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="fixed top-1/4 left-1/4 -translate-x-1/4 -translate-y-1/4 bg-white/10 backdrop-blur-lg border border-blue-400 rounded-xl shadow-lg p-8 w-[48rem] h-[20rem] z-50"
        >
          {/* Close Button */}
          <button
            onClick={() => setShowDropzone(false)}
            className="absolute -top-3 -right-3 bg-black text-white p-1 rounded-full hover:bg-red-600 transition"
          >
            <X className="w-4 h-4" />
          </button>

          {/* Drop Area */}
          <motion.div
            {...getRootProps()}
            whileHover={{ scale: 1.02 }}
            className={`border-dashed border-4 ${
              isDragActive ? "border-blue-500 bg-blue-50/50" : "border-blue-400"
            } rounded-lg p-10 h-full flex items-center justify-center text-center cursor-pointer transition-all`}
          >
            <input {...getInputProps()} />
            {isDragActive ? (
              <p className="text-blue-600 text-xl font-semibold">Drop files here...</p>
            ) : (
              <p className="text-gray-200 text-lg font-medium">
                Drag and drop files here, or click to select
              </p>
            )}
          </motion.div>
        </motion.div>
      )}
    </div>
  );
};

export default Dropzone;
