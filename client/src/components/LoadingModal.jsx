import React, { useEffect, useState } from 'react';

const messages = [
  "Reviewing your code...",
  "Analyzing logic and structure...",
  "Checking for best practices...",
  "Optimizing performance...",
  "Almost done, hang tight!"
];

const LoadingModal = () => {
  const [currentMessageIndex, setCurrentMessageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentMessageIndex((prevIndex) => (prevIndex + 1) % messages.length);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center backdrop-blur-sm animate-fade-in">
      <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-2xl w-full max-w-sm mx-4 text-center transform scale-95 animate-scale-in">
        <div className="flex justify-center mb-6">
          <svg
            className="animate-spin h-10 w-10 text-blue-600 dark:text-blue-400"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
            />
          </svg>
        </div>
        <p className="text-xl font-semibold text-gray-800 dark:text-gray-100 transition-opacity duration-300 ease-in-out">
            <span key={currentMessageIndex} className="animate-fade-in-out">
                {messages[currentMessageIndex]}
            </span>
        </p>
      </div>
    </div>
  );
};

export default LoadingModal;