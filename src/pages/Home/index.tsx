import AudioPlayer from "../../components/AudioPlayer";
import Container from "../../components/Container";
import Firework from "../../components/Firework";
import Image from "../../components/Image";
import bg from "../../assets/images/bg.png";
import Confirm from "../../components/Confirm";
import { useRef, useState } from "react";

const HomePage = () => {
  const audioRef = useRef<HTMLAudioElement>(null);

  const [isHidden, setIsHidden] = useState(false);

  const togglePlay = () => {
    if (audioRef.current && !isHidden) {
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
    <div className=" text-black">
      <Container>
        <div className=" relative">
          <div className=" flex flex-col items-center justify-center gap-4 px-4 pb-4 pt-6">
            <img src={bg} alt="bg" className="w-1/2 max-w-[100px] sm:max-w-[120px]" />
            <h1 className="text-2xl font-semibold ">Nguyễn Ngọc Bích Trâm</h1>
          </div>
          <Image />
          <AudioPlayer isHidden={isHidden} ref={audioRef} onClick={togglePlay} onEnded={handleEnded} />
          <Confirm onClick={togglePlay} />
          <Firework />
        </div>
      </Container>
    </div>
  );
};

export default HomePage;
