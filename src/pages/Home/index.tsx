import AudioPlayer from "../../components/AudioPlayer";
import Container from "../../components/Container";
import Firework from "../../components/Firework";
import Image from "../../components/Image";
import bg from "../../assets/images/bg.png";

const HomePage = () => {
  return (
    <div className=" text-black">
      <Container>
        <div className=" relative">
          <div className=" flex flex-col items-center justify-center gap-4 px-4 pb-4 pt-6">
            <img src={bg} alt="bg" className="w-1/2 max-w-[100px] sm:max-w-[120px]" />
            <h1 className="text-2xl font-semibold ">Nguyễn Ngọc Bích Trâm</h1>
          </div>
          <Image />
          <AudioPlayer />
          <Firework />
        </div>
      </Container>
    </div>
  );
};

export default HomePage;
