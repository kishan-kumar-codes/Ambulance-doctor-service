"use client";
import React from "react";

const Loader: React.FC = () => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm z-50">
      <div className="flex flex-col items-center space-y-4">
        <div className="w-16 h-16 rounded-full border-4 border-t-4 border-blue-500 border-opacity-50 animate-spin"></div>
        <p className="text-white text-lg font-semibold">Loading...</p>
        <div
          className="mt-4 w-40 h-2 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-full animate-pulse hover:animate-bounce transition-all duration-300"
          title="Please wait"
        ></div>
      </div>
    </div>
  );
};

export default Loader;
