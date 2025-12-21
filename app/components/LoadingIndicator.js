'use client';

import { useState, useEffect } from 'react';

export default function LoadingIndicator({ message = "Loading video" }) {
  const [dots, setDots] = useState('');
  
  useEffect(() => {
    const interval = setInterval(() => {
      setDots(prev => prev.length >= 3 ? '' : prev + '.');
    }, 400);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="absolute inset-0 flex items-center justify-center z-10 bg-black/20 backdrop-blur-sm rounded-xl">
      <div className="bg-white/95 px-6 py-3 rounded-lg shadow-lg">
        <p className="text-gray-700 font-medium">
          {message}<span className="inline-block w-6 text-left">{dots}</span>
        </p>
      </div>
    </div>
  );
}
