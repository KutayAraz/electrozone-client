import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Scrollbar, A11y } from "swiper/modules"
import SliderProductCard from './SwiperProductCard/SwiperProductCard';
import 'swiper/css';
import { useRef, useEffect } from 'react';
import { ReactComponent as PrevArrow } from "@assets/svg/prev-arrow.svg";
import { ReactComponent as NextArrow } from "@assets/svg/next-arrow.svg";
import { SliderProductCardProps } from './SwiperProductCard/models';
import { Swiper as SwiperClass } from "swiper/types";

const ProductCarousel = ({ products, className }: { products: SliderProductCardProps[], className?: string }) => {
    const prevRef = useRef<HTMLDivElement>(null);
    const nextRef = useRef<HTMLDivElement>(null);
    const swiperRef = useRef<any>(null);

    useEffect(() => {
        if (swiperRef.current) {
            swiperRef.current.params.navigation.prevEl = prevRef.current;
            swiperRef.current.params.navigation.nextEl = nextRef.current;
            swiperRef.current.navigation.init();
            swiperRef.current.navigation.update();
        }
    }, []);

    return (
        <div className="relative overflow-hidden px-5">
            <div className="relative mx-auto px-2.5">
                <div ref={prevRef} className="absolute top-1/2 -left-3 transform -translate-y-1/2 z-10 cursor-pointer">
                    <PrevArrow className="w-6 h-6" />
                </div>
                <Swiper
                    modules={[Navigation, Pagination, Scrollbar, A11y]}
                    onSwiper={(swiper) => { swiperRef.current = swiper; }}
                    spaceBetween={0}
                    slidesPerView={5}
                    navigation
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
                    {products.map((product: SliderProductCardProps) => (
                        <SwiperSlide key={product.id}>
                            <SliderProductCard
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
                <div ref={nextRef} className="absolute top-1/2 -right-3 transform -translate-y-1/2 z-10 cursor-pointer">
                    <NextArrow className="w-6 h-6" />
                </div>
            </div>
        </div>
    );
};

export default ProductCarousel;
