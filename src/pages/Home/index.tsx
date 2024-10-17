import AudioPlayer from "../../components/AudioPlayer";
import Container from "../../components/Container";
import Firework from "../../components/Firework";
import Image from "../../components/Image";
import bg from "../../assets/images/bg.png";
import Confirm from "../../components/Confirm";
import { useEffect, useRef, useState } from "react";
import { IS_OPEN } from "../../constant/common";
import { onValue, ref } from "firebase/database";
import { db } from "../../provider/Firebase";

const HomePage = () => {
  const audioRef = useRef<HTMLAudioElement>(null);

  const [isHidden, setIsHidden] = useState(false);
  const [isShowForm, setIsShowForm] = useState(false);

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

  useEffect(() => {
    const dbRef = ref(db, "data/isShowForm");

    const unsubscribe = onValue(dbRef, (snapshot) => {
      if (snapshot.exists()) {
        setIsShowForm(snapshot.val());
      } else {
        console.log("No data available");
      }
    });

    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <div className=" text-black" onClick={togglePlay}>
      <Container>
        <div className=" relative">
          <div className=" flex flex-col items-center justify-center gap-4 px-4 pb-4 pt-6">
            <img src={bg} alt="bg" className="w-1/2 max-w-[100px] sm:max-w-[120px]" />
            <h1 className="text-2xl font-semibold ">Nguyễn Ngọc Bích Trâm</h1>
          </div>
          {IS_OPEN ? (
            <Image />
          ) : (
            <div>
              <h1 className="text-center text-xl">Chưa tới ngày nên mình chưa mở cho bạn xem đâu hihi</h1>
            </div>
          )}

          <AudioPlayer isHidden={isHidden} ref={audioRef} onClick={togglePlay} onEnded={handleEnded} />
          {isShowForm && <Confirm onClick={togglePlay} />}
          <Firework />
        </div>
      </Container>
    </div>
  );
};

export default HomePage;
