import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCards } from "swiper/modules";

import "swiper/css";
import "swiper/css/effect-cards";
import { ImageList } from "../../constant/common";
import Modal from "../Modal";
import { useCallback, useMemo, useState } from "react";
import { SlideItemType } from "../../type/common";

const Image = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [itemSelected, setItemSelected] = useState<SlideItemType>();

  const handleClose = () => {
    setIsOpen(false);
  };

  const handleClickImage = useCallback((item: SlideItemType) => {
    setIsOpen(true);
    setItemSelected(item);
  }, []);

  const renderImage = useMemo(() => {
    return (
      <Swiper effect={"cards"} grabCursor={true} modules={[EffectCards]} className="mySwiper m-0! max-w-[250px]">
        {ImageList.map((item, index) => {
          return (
            <SwiperSlide className="h-[450px] w-full rounded-2xl  bg-white text-black shadow-md" key={index}>
              <div className=" relative flex h-full flex-col items-center  p-4" onClick={() => handleClickImage(item)}>
                <img
                  src={item.image}
                  alt={item.image}
                  className="max-h-[250px] w-full rounded-2xl object-cover sm:max-h-[300px]"
                />
                <div className="">
                  <h1>{item.content}</h1>
                </div>
              </div>
            </SwiperSlide>
          );
        })}
      </Swiper>
    );
  }, [handleClickImage]);

  return (
    <>
      <div>{renderImage}</div>
      <Modal isOpen={isOpen} className="min-h-[550px] max-w-full sm:max-w-[400px]" onClose={handleClose}>
        <div className="py-4">
          <img
            src={itemSelected?.image}
            alt={itemSelected?.image}
            className=" max-h-[300px] w-full rounded-lg object-cover"
          />
        </div>
      </Modal>
    </>
  );
};

export default Image;
