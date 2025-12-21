'use client';

import { useState, useRef, useEffect } from 'react';
import LoadingIndicator from './LoadingIndicator';

export default function Avatar({ isSpeaking, videoToPlay, onVideoEnd }) {
  const videoRef = useRef(null);
  const idleVideoRef = useRef(null);
  const introVideoRef = useRef(null);
  const [isPlayingVideo, setIsPlayingVideo] = useState(false);
  const [introPlayed, setIntroPlayed] = useState(false);
  const [showIntro, setShowIntro] = useState(false);
  const [isIdle, setIsIdle] = useState(true);
  const [isIdleLoading, setIsIdleLoading] = useState(true);
  const [isIntroLoading, setIsIntroLoading] = useState(false);
  const [isContentLoading, setIsContentLoading] = useState(false);

  useEffect(() => {
    if (idleVideoRef.current) {
      // Check if video is already loaded
      if (idleVideoRef.current.readyState >= 3) {
        setIsIdleLoading(false);
      }
      idleVideoRef.current.play();
    }
  }, []);

  const handleIntroEnd = () => {
    setShowIntro(false);
    setIntroPlayed(true);
    setIsIdle(true);
    if (idleVideoRef.current) {
      idleVideoRef.current.play().catch(err => console.log('Idle play error:', err));
    }
  };

  const playIntro = () => {
    setShowIntro(true);
    setIsIdle(false);
    setIsIntroLoading(true);
    if (idleVideoRef.current) {
      idleVideoRef.current.pause();
    }
    if (introVideoRef.current) {
      introVideoRef.current.currentTime = 0;
      introVideoRef.current.play();
    }
  };

  useEffect(() => {
    if (videoToPlay && videoRef.current) {
      setIsContentLoading(true);
      setIsPlayingVideo(true);
      setIsIdle(false);
      if (idleVideoRef.current) {
        idleVideoRef.current.pause();
      }
      videoRef.current.src = videoToPlay;
      videoRef.current.currentTime = 0;
      videoRef.current.play();
    }
  }, [videoToPlay]);

  const handleVideoEnd = () => {
    setIsPlayingVideo(false);
    setIsIdle(true);
    if (idleVideoRef.current) {
      idleVideoRef.current.play();
    }
    if (onVideoEnd) {
      onVideoEnd();
    }
  };

  return (
    <div className="w-full h-full relative flex items-center justify-center overflow-hidden">
      
      {/* Red Play Button - Bottom Center */}
      {isIdle && (
        <button
          onClick={playIntro}
          className="absolute bottom-4 left-1/2 transform -translate-x-1/2 z-20 w-12 h-12 rounded-full bg-red-600 hover:bg-red-700 shadow-lg flex items-center justify-center transition-all duration-200 hover:scale-110"
          aria-label="Play intro"
        >
          <svg className="w-6 h-6 text-white ml-0.5" fill="currentColor" viewBox="0 0 20 20">
            <path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z"/>
          </svg>
        </button>
      )}

      {/* Intro Video */}
      <video
        ref={introVideoRef}
        className={`w-full h-full object-contain transition-opacity duration-500 ${showIntro ? 'opacity-100' : 'opacity-0'}`}
        onEnded={handleIntroEnd}
        onCanPlay={() => setIsIntroLoading(false)}
        onLoadedData={() => setIsIntroLoading(false)}
        playsInline
        disablePictureInPicture
        controlsList="nodownload nofullscreen noremoteplayback"
        style={{ pointerEvents: 'none', display: showIntro ? 'block' : 'none' }}
      >
        <source src="/Intro.mp4" type="video/mp4" />
      </video>

      {/* Idle Loop Video */}
      <video
        ref={idleVideoRef}
        className={`w-full h-full object-contain transition-opacity duration-500 ${!showIntro && !isPlayingVideo ? 'opacity-100' : 'opacity-0'}`}
        loop
        muted
        playsInline
        onCanPlay={() => setIsIdleLoading(false)}
        onLoadedData={() => setIsIdleLoading(false)}
        disablePictureInPicture
        controlsList="nodownload nofullscreen noremoteplayback"
        style={{ pointerEvents: 'none', display: !showIntro ? 'block' : 'none' }}
      >
        <source src="/Idle.mp4" type="video/mp4" />
      </video>

      {/* Content Video Overlay */}
      {videoToPlay && (
        <video
          ref={videoRef}
          className={`absolute inset-0 w-full h-full object-contain transition-opacity duration-500 ${isPlayingVideo ? 'opacity-100' : 'opacity-0'}`}
          onEnded={handleVideoEnd}
          onCanPlay={() => setIsContentLoading(false)}
          onLoadedData={() => setIsContentLoading(false)}
          playsInline
          disablePictureInPicture
          controlsList="nodownload nofullscreen noremoteplayback"
          style={{ pointerEvents: 'none' }}
        />
      )}

      {/* Loading Indicators */}
      {isIdleLoading && !showIntro && !isPlayingVideo && <LoadingIndicator message="Loading" />}
      {isIntroLoading && showIntro && <LoadingIndicator message="Loading video" />}
      {isContentLoading && isPlayingVideo && <LoadingIndicator message="Loading video" />}
    </div>
  );
}
