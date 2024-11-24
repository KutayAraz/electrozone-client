import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Scrollbar, A11y } from "swiper/modules"
import 'swiper/css';
import { useRef, useState } from 'react';
import { ReactComponent as NavButton } from "@assets/svg/carousel-nav-button.svg";
import SwiperProductCard from '@/components/ui/carousel/carousel-card';
import { SwiperProductCardProps } from '@/common/SwiperProductCard/models';
import { Swiper as SwiperType } from 'swiper/types';

const SuggestedProductCarousel = ({ products, className }: { products: SwiperProductCardProps[], className?: string }) => {
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
                <div ref={prevRef} className={`absolute top-1/2 -left-4 transform -translate-y-1/2 z-10 cursor-pointer ${isBeginning ? 'opacity-50 cursor-not-allowed' : ''}`}>
                    <NavButton className="w-5 h-5 rotate-180" />
                </div>
                <Swiper
                    modules={[Navigation, Scrollbar, A11y]}
                    spaceBetween={0}
                    slidesPerView={2}
                    onSlideChange={(swiper) => onSwiperUpdate(swiper)}
                    navigation={{
                        prevEl: prevRef.current,
                        nextEl: nextRef.current
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
                        }
                    }}
                    className={`${className}`}
                >
                    {products.map((product: SwiperProductCardProps) => (
                        <SwiperSlide key={product.id}>
                            <SwiperProductCard
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
                <div ref={nextRef} className={`absolute top-1/2 -right-4 transform -translate-y-1/2 z-10 cursor-pointer ${isEnd ? 'opacity-30 cursor-not-allowed' : ''}`}>
                    <NavButton className="w-5 h-5 " />
                </div>
            </div>
        </div>
    );
};

export default SuggestedProductCarousel;
