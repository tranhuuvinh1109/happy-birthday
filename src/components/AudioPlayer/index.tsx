import { ForwardedRef, forwardRef } from "react";

type AudioPlayerProps = {
  onClick: () => void;
  onEnded: () => void;
  isHidden: boolean;
};
const AudioPlayer = forwardRef(
  ({ onClick, onEnded, isHidden }: AudioPlayerProps, audioPlayerRef: ForwardedRef<HTMLAudioElement>) => {
    return (
      <audio
        ref={audioPlayerRef}
        className={`fixed bottom-0 left-0 right-0 top-0 bg-transparent ${isHidden ? "-z-10" : "z-50"}`}
        src="/HappyBirthdayToYou.mp3"
        preload="auto"
        onEnded={onEnded}
        onClick={onClick}
      />
    );
  }
);

export default AudioPlayer;
