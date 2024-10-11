import React, { useRef, useState } from "react";

const AudioPlayer: React.FC = () => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isHidden, setIsHidden] = useState(false);

  const togglePlay = () => {
    if (audioRef.current) {
      audioRef.current.play();
      setIsHidden(true);
    }
  };

  const handleEnded = () => {
    if (audioRef.current) {
      audioRef.current.play();
    }
  };
  return (
    <div
      className={`fixed bottom-0 left-0 right-0 top-0 bg-transparent ${isHidden ? "-z-10" : "z-50"}`}
      onClick={togglePlay}
    >
      <audio ref={audioRef} src="src/assets/music/HappyBirthdayToYou.mp3" preload="auto" onEnded={handleEnded} />
    </div>
  );
};

export default AudioPlayer;
