import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCards } from "swiper/modules";

import "swiper/css";
import "swiper/css/effect-cards";
import { ImageList } from "../../constant/common";
import Modal from "../Modal";
import { useCallback, useEffect, useMemo, useState } from "react";
import { SlideItemType } from "../../type/common";
import { getDownloadURL, listAll, ref as storageRef } from "firebase/storage";
import { storage } from "../../provider/Firebase";

const Image = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [itemSelected, setItemSelected] = useState<SlideItemType>();
  const [listImage, setListImage] = useState<SlideItemType[]>([]);

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
        {listImage.map((item, index) => {
          return (
            <SwiperSlide className="h-[450px] w-full rounded-2xl  bg-white text-black shadow-md" key={index}>
              <div className=" relative flex h-full flex-col items-center  p-4" onClick={() => handleClickImage(item)}>
                <img
                  src={item.image}
                  alt={item.image}
                  className="max-h-[250px] w-full rounded-2xl object-cover sm:max-h-[300px]"
                />
                <div className="px-2 text-base font-semibold">
                  <h1 className="mt-2 text-center">{item.content}</h1>
                </div>
              </div>
            </SwiperSlide>
          );
        })}
      </Swiper>
    );
  }, [handleClickImage, listImage]);

  useEffect(() => {
    const fetchImages = async () => {
      if (listImage.length > 0) {
        return;
      }
      const folderRef = storageRef(storage, "mylove/");

      try {
        const res = await listAll(folderRef);
        const urls = await Promise.all(
          res.items.map(async (item) => {
            const url = await getDownloadURL(item);
            return url;
          })
        );
        const additionalItem = urls.map(
          (item) =>
            ({
              image: item,
              content: "Tiếp → 💝",
            }) as SlideItemType
        );
        setListImage([...ImageList, ...additionalItem]);
      } catch (error) {
        console.error("Error fetching images: ", error);
      }
    };

    fetchImages();
  }, [listImage]);

  return (
    <>
      <div>{renderImage}</div>
      <Modal isOpen={isOpen} className="min-h-[550px] max-w-full" onClose={handleClose}>
        <div className="py-4">
          <img src={itemSelected?.image} alt={itemSelected?.image} className=" w-full rounded-lg object-cover" />
          <div className="px-2 text-base font-semibold">
            <h1 className="mt-2 text-center">{itemSelected?.content}</h1>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default Image;
