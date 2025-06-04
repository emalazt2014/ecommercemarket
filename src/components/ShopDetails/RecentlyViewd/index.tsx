'use client';
import ProductItem from '@/components/Common/ProductItem';
import Image from 'next/image';
import { useEffect, useState } from 'react';

import { ChevronLeftIcon, ChevronRightIcon } from '@/assets/icons';
import { getAllProducts } from '@/sanity/sanity-shop-utils';
import { Product } from '@/types/product';
import { useCallback, useRef } from 'react';
import 'swiper/css';
import 'swiper/css/navigation';
import { Swiper, SwiperRef, SwiperSlide } from 'swiper/react';

const RecentlyViewedItems = () => {
  const [products, setProducts] = useState<Product[]>([]);

  const sliderRef = useRef<SwiperRef>(null);

  const handlePrev = useCallback(() => {
    if (!sliderRef.current) return;

    sliderRef.current.swiper?.slidePrev();
  }, []);

  const handleNext = useCallback(() => {
    if (!sliderRef.current) return;

    sliderRef.current.swiper.slideNext();
  }, []);

  useEffect(() => {
    const fetchProducts = async () => {
      const products = await getAllProducts();
      setProducts(products);
    };

    fetchProducts();
  }, [setProducts]);

  return (
    <section className="overflow-hidden pt-17.5">
      <div className="max-w-[1170px] w-full mx-auto px-4 sm:px-8 xl:px-0 pb-15 border-b border-gray-3">
        <div className="swiper categories-carousel common-carousel">
          {/* <!-- section title --> */}
          <div className="mb-10 flex items-center justify-between">
            <div>
              <span className="flex items-center gap-2.5 font-medium text-dark mb-1.5">
                <Image
                  src="/images/icons/icon-05.svg"
                  width={17}
                  height={17}
                  alt="icon"
                />
                Recent
              </span>
              <h2 className="font-semibold text-xl xl:text-heading-5 text-dark">
                Recently Viewed Products
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
            slidesPerView={4}
            spaceBetween={20}
            className="justify-between"
          >
            {products.length > 0 &&
              products.slice(0, 6).map((item, key) => (
                <SwiperSlide key={key}>
                  <ProductItem item={item} />
                </SwiperSlide>
              ))}
          </Swiper>
        </div>
      </div>
    </section>
  );
};

export default RecentlyViewedItems;
