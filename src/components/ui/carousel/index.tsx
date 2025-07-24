import { useRef } from "react";
import "swiper/css";
import { A11y, Navigation, Scrollbar } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import NavButton from "@assets/svgs/carousel-nav-button.svg?react";

import { CarouselCard, CarouselCardProps } from "./carousel-card";

interface CarouselProps {
  products: CarouselCardProps[];
  onWishlistToggle: (id: number) => void;
  isTogglingWishlist: (id: number) => boolean;
  className?: string;
}

export const Carousel = ({
  products,
  className,
  onWishlistToggle,
  isTogglingWishlist,
}: CarouselProps) => {
  const prevRef = useRef<HTMLDivElement>(null);
  const nextRef = useRef<HTMLDivElement>(null);

  return (
    <div className="relative overflow-hidden xs:px-6">
      <div className="relative mx-auto">
        <div
          ref={prevRef}
          className="hidden xs:block absolute -left-6 top-1/2 -translate-y-1/2 cursor-pointer z-10 bg-white rounded-full shadow-sm p-2 hover:shadow-lg transition-shadow duration-200"
        >
          <NavButton className="size-5 rotate-180 text-gray-600" />
        </div>
        <Swiper
          modules={[Navigation, Scrollbar, A11y]}
          onBeforeInit={(swiper: any) => {
            swiper.params.navigation.prevEl = prevRef.current;
            swiper.params.navigation.nextEl = nextRef.current;
          }}
          spaceBetween={0}
          slidesPerView={2}
          slidesPerGroup={2}
          loop={true}
          navigation={{
            prevEl: prevRef.current,
            nextEl: nextRef.current,
          }}
          loopAddBlankSlides={false}
          pagination={{ clickable: true }}
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
                {...product}
                onWishlistToggle={onWishlistToggle}
                isTogglingWishlist={isTogglingWishlist}
              />
            </SwiperSlide>
          ))}
        </Swiper>
        <div
          ref={nextRef}
          className="hidden xs:block absolute -right-6 top-1/2 -translate-y-1/2 cursor-pointer z-3 bg-white rounded-full shadow-sm p-2 hover:shadow-lg transition-shadow duration-200"
        >
          <NavButton className="size-5 text-gray-600" />
        </div>
      </div>
    </div>
  );
};
