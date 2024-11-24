import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Scrollbar, A11y } from "swiper/modules"
import 'swiper/css';
import { useRef } from 'react';
import { ReactComponent as NavButton } from "@assets/svg/carousel-nav-button.svg";
import { CarouselCard, CarouselCardProps } from './carousel-card';

type CarouselProps = {
    products: CarouselCardProps[],
    className?: string
}

export const Carousel = ({ products, className }: CarouselProps) => {
    const prevRef = useRef<HTMLDivElement>(null);
    const nextRef = useRef<HTMLDivElement>(null);

    return (
        <div className="relative overflow-hidden px-5">
            <div className="relative mx-auto">
                <div ref={prevRef} className="absolute top-1/2 -left-4 transform -translate-y-1/2 z-10 cursor-pointer">
                    <NavButton className="w-5 h-5 rotate-180" />
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
                        nextEl: nextRef.current
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
                        }
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
                <div ref={nextRef} className="absolute top-1/2 -right-4 transform -translate-y-1/2 z-10 cursor-pointer">
                    <NavButton className="w-5 h-5 " />
                </div>
            </div>
        </div>
    );
};
