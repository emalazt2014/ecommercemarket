"use client";
import { FourSquaresIcon, TwoSquaresIcon } from '@/assets/icons';
import { Product } from '@/types/product';
import { useState } from 'react';
import SingleGridItem from '../Shop/SingleGridItem';
import SingleListItem from '../Shop/SingleListItem';
import CustomSelect from '../ShopWithSidebar/CustomSelect';

const ShopWithoutSidebar = ({ shopData }: { shopData: Product[] }) => {
  const [productStyle, setProductStyle] = useState('grid');

  return (
    <section className="overflow-hidden relative pb-20 pt-5 lg:pt-20 xl:pt-28 bg-[#f3f4f6]">
      <div className="max-w-[1170px] w-full mx-auto px-4 sm:px-8 xl:px-0">
        <div className="flex gap-7.5">
          <div className="w-full">
            <div className="rounded-lg bg-white shadow-1 pl-3 pr-2.5 py-2.5 mb-6">
              <div className="flex items-center justify-between">
                {/* <!-- top bar left --> */}
                <div className="flex flex-wrap items-center gap-4">
                  <CustomSelect />

                  <p>
                    Showing{' '}
                    <span className="text-dark">
                      {shopData.length} of {shopData.length}
                    </span>{' '}
                    Products
                  </p>
                </div>

                {/* <!-- top bar right --> */}
                <div className="flex items-center gap-2.5">
                  <button
                    onClick={() => setProductStyle('grid')}
                    aria-label="button for product grid tab"
                    className={`${
                      productStyle === 'grid'
                        ? 'bg-blue border-blue text-white'
                        : 'text-dark bg-gray-1 border-gray-3'
                    } flex items-center justify-center w-10.5 h-9 rounded-[5px] border ease-out duration-200 hover:bg-blue hover:border-blue hover:text-white`}
                  >
                    <FourSquaresIcon />
                  </button>

                  <button
                    onClick={() => setProductStyle('list')}
                    aria-label="button for product list tab"
                    className={`${
                      productStyle === 'list'
                        ? 'bg-blue border-blue text-white'
                        : 'text-dark bg-gray-1 border-gray-3'
                    } flex items-center justify-center w-10.5 h-9 rounded-[5px] border ease-out duration-200 hover:bg-blue hover:border-blue hover:text-white`}
                  >
                    <TwoSquaresIcon />
                  </button>
                </div>
              </div>
            </div>

            {shopData.length > 0 ? (
              <div
                className={`${
                  productStyle === 'grid'
                    ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-7.5 gap-y-9'
                    : 'flex flex-col gap-7.5'
                }`}
              >
                {shopData.map((item) =>
                  productStyle === 'grid' ? (
                    <SingleGridItem item={item} key={item._id} />
                  ) : (
                    <SingleListItem item={item} key={item._id} />
                  )
                )}
              </div>
            ) : (
              <p className="text-center text-2xl py-5">
                {' '}
                No products found in this category!
              </p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ShopWithoutSidebar;
