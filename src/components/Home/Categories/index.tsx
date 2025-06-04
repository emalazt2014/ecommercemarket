'use client';
import { getCategories } from '@/sanity/sanity-shop-utils';
import { Category } from '@/types/category';
import { useCallback, useEffect, useRef, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import {
  CategoriesIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from '@/assets/icons';
import 'swiper/css';
import 'swiper/css/navigation';
import SingleItem from './SingleItem';

const Categories = () => {
  const [data, setData] = useState<Category[]>([]);
  const sliderRef = useRef(null);

  const handlePrev = useCallback(() => {
    if (!sliderRef.current) return;
    // @ts-ignore
    sliderRef.current.swiper.slidePrev();
  }, []);

  const handleNext = useCallback(() => {
    if (!sliderRef.current) return;
    // @ts-ignore
    sliderRef.current.swiper.slideNext();
  }, []);

  useEffect(() => {
    if (sliderRef.current) {
      // @ts-ignore
      sliderRef.current.swiper.init();
    }

    const fetchCategories = async () => {
      const result = await getCategories();
      setData(result);
    };

    fetchCategories();
  }, [setData]);

  return (
    <section className="overflow-hidden pt-17.5">
      <div className="max-w-[1170px] w-full mx-auto px-4 sm:px-8 xl:px-0 pb-15 border-b border-gray-3">
        <div className="swiper categories-carousel common-carousel">
          {/* <!-- section title --> */}
          <div className="mb-10 flex items-center justify-between">
            <div>
              <span className="flex items-center gap-2.5 font-medium text-dark mb-1.5">
                <CategoriesIcon />
                Categories
              </span>
              <h2 className="font-semibold text-xl xl:text-heading-5 text-dark">
                Browse by Category
              </h2>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={handlePrev}
                className="swiper-button-prev"
                aria-label="previous button"
              >
                <ChevronLeftIcon />
              </button>

              <button
                onClick={handleNext}
                className="swiper-button-next"
                aria-label="next button"
              >
                <ChevronRightIcon />
              </button>
            </div>
          </div>

          <Swiper
            ref={sliderRef}
            slidesPerView={6}
            breakpoints={{
              // when window width is >= 640px
              0: {
                slidesPerView: 2,
              },
              1000: {
                slidesPerView: 4,
                // spaceBetween: 4,
              },
              // when window width is >= 768px
              1200: {
                slidesPerView: 6,
              },
            }}
          >
            {data.length > 0 &&
              data.map((item, key) => (
                <SwiperSlide key={key}>
                  <SingleItem item={item} />
                </SwiperSlide>
              ))}
          </Swiper>
        </div>
      </div>
    </section>
  );
};

export default Categories;
