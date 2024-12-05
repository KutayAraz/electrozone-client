import { useRef, useState } from "react";
import { Navigation, Scrollbar, A11y } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Swiper as SwiperType } from "swiper/types";

import { CarouselCardProps, CarouselCard } from "@/components/ui/carousel/carousel-card";
import { ReactComponent as NavButton } from "@assets/svgs/carousel-nav-button.svg";

export const SuggestedProductCarousel = ({
  products,
  className,
}: {
  products: CarouselCardProps[];
  className?: string;
}) => {
  const prevRef = useRef<HTMLDivElement>(null);
  const nextRef = useRef<HTMLDivElement>(null);
  const [isBeginning, setIsBeginning] = useState(true);
  const [isEnd, setIsEnd] = useState(false);

  const onSwiperUpdate = (swiper: SwiperType) => {
    setIsBeginning(swiper.isBeginning);
    setIsEnd(swiper.isEnd);
  };

  return (
    <div className="relative overflow-hidden px-5">
      <div className="relative mx-auto">
        <div
          ref={prevRef}
          className={`absolute -left-4 top-1/2 z-10 -translate-y-1/2 cursor-pointer${
            isBeginning ? "cursor-not-allowed opacity-50" : ""
          }`}
        >
          <NavButton className="size-5 rotate-180" />
        </div>
        <Swiper
          modules={[Navigation, Scrollbar, A11y]}
          spaceBetween={0}
          slidesPerView={2}
          onSlideChange={(swiper) => onSwiperUpdate(swiper)}
          navigation={{
            prevEl: prevRef.current,
            nextEl: nextRef.current,
          }}
          scrollbar={{ draggable: true }}
          breakpoints={{
            1280: {
              slidesPerView: 5,
              slidesPerGroup: 5,
            },
            1024: {
              slidesPerView: 4,
              slidesPerGroup: 4,
            },
            768: {
              slidesPerView: 3,
              slidesPerGroup: 3,
            },
            480: {
              slidesPerView: 2,
              slidesPerGroup: 2,
            },
          }}
          className={`${className}`}
        >
          {products.map((product: CarouselCardProps) => (
            <SwiperSlide key={product.id}>
              <CarouselCard
                id={product.id}
                productName={product.productName}
                brand={product.brand}
                thumbnail={product.thumbnail}
                price={product.price}
                subcategory={product.subcategory}
                category={product.category}
              />
            </SwiperSlide>
          ))}
        </Swiper>
        <div
          ref={nextRef}
          className={`absolute -right-4 top-1/2 z-10 -translate-y-1/2 cursor-pointer${
            isEnd ? "cursor-not-allowed opacity-30" : ""
          }`}
        >
          <NavButton className="size-5 " />
        </div>
      </div>
    </div>
  );
};
