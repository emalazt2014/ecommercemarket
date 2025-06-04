'use client';
import { Suspense, useEffect, useMemo, useState } from 'react';
import Breadcrumb from '../Common/Breadcrumb';
import CategoryDropdown from './CategoryDropdown';
import ClearFilters from './ClearFilters';
import ColorsDropdown from './ColorsDropdown';
import RadixSlider from './RadixSlider';
import SizeDropdown from './SizeDropdown';

import {
  FourSquaresIcon,
  SidebarToggleIcon,
  TwoSquaresIcon,
} from '@/assets/icons';
import { Category } from '@/types/category';
import { Product } from '@/types/product';
import SingleListItem from '../Shop/SingleListItem';
import SingleGridItem from '../Shop/SingleProductItem';
import ProductsEmptyState from './ProductsEmptyState';
import TopBar from './TopBar';

type PropsType = {
  data: {
    allProducts: Product[];
    products: Product[];
    categories: Category[];
    allProductsCount: number;
    highestPrice: number;
  };
};

const ShopWithSidebar = ({ data }: PropsType) => {
  const { allProducts, products, categories, allProductsCount } = data;

  const [productStyle, setProductStyle] = useState('grid');
  const [productSidebar, setProductSidebar] = useState(false);
  const [stickyMenu, setStickyMenu] = useState(false);

  const availableSizes = useMemo(() => {
    const sizes = allProducts.flatMap((product) => product.sizes || []);
    return [...new Set(sizes)];
  }, []);

  const availableColors = useMemo(() => {
    const colors = allProducts.flatMap((product) => product.colors || []);
    return [...new Set(colors)];
  }, []);

  const handleStickyMenu = () => {
    if (window.scrollY >= 80) {
      setStickyMenu(true);
    } else {
      setStickyMenu(false);
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleStickyMenu);

    // closing sidebar while clicking outside
    function handleClickOutside(event: any) {
      if (!event.target.closest('.sidebar-content')) {
        setProductSidebar(false);
      }
    }

    if (productSidebar) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [productSidebar]);

  return (
    <>
      <Breadcrumb
        title={'Explore All Products'}
        pages={['shop', '/', 'shop with sidebar']}
      />

      <section className="overflow-hidden relative pb-20 pt-5 lg:pt-20 xl:pt-28 bg-gray-2">
        <div className="max-w-[1170px] w-full mx-auto px-4 sm:px-8 xl:px-0">
          <div className="flex gap-7.5">
            {/* Sidebar Start */}
            <div
              className={`sidebar-content fixed xl:z-1 z-9999 left-0 top-0 xl:translate-x-0 xl:static max-w-[330px] xl:max-w-[270px] w-full ease-out duration-200 ${productSidebar ? 'translate-x-0 bg-white' : '-translate-x-full'
                }`}
            >
              <button
                onClick={() => setProductSidebar(!productSidebar)}
                aria-label="button for product sidebar toggle"
                className={`xl:hidden absolute -right-12.5 sm:-right-8 flex items-center justify-center w-8 h-8 rounded-md bg-white shadow-1 ${stickyMenu
                  ? 'lg:top-20 sm:top-34.5 top-35'
                  : 'lg:top-24 sm:top-39 top-37'
                  }`}
              >
                <SidebarToggleIcon />
              </button>

              <div className="flex flex-col gap-6 overflow-y-auto max-xl:h-screen max-xl:p-5">
                {/* filter box */}
                <ClearFilters />

                <Suspense>
                  <CategoryDropdown categories={categories} />
                </Suspense>

                {/* gender box */}
                {/* <GenderDropdown genders={genders} /> */}

                <Suspense>
                  <SizeDropdown availableSizes={availableSizes} />
                </Suspense>

                {/* color box */}
                <ColorsDropdown availableColors={availableColors} />

                {/*  price range box */}
                <RadixSlider highestPrice={data.highestPrice} />
              </div>
            </div>
            {/* Sidebar End */}

            {/* Content Start */}
            <div className="xl:max-w-[870px] w-full">
              <div className="rounded-lg bg-white shadow-1 pl-3 pr-2.5 py-2.5 mb-6">
                <div className="flex items-center justify-between">
                  {/* top bar left */}
                  <TopBar
                    allProductsCount={allProductsCount}
                    showingProductsCount={products.length}
                  />

                  {/* top bar right */}
                  <div className="flex items-center gap-2.5">
                    <button
                      onClick={() => setProductStyle('grid')}
                      aria-label="button for product grid tab"
                      className={`${productStyle === 'grid'
                        ? 'bg-blue border-blue text-white'
                        : 'text-dark bg-gray-1 border-gray-3'
                        } flex items-center justify-center w-10.5 h-9 rounded-[5px] border ease-out duration-200 hover:bg-blue hover:border-blue hover:text-white`}
                    >
                      <FourSquaresIcon />
                    </button>

                    <button
                      onClick={() => setProductStyle('list')}
                      aria-label="button for product list tab"
                      className={`${productStyle === 'list'
                        ? 'bg-blue border-blue text-white'
                        : 'text-dark bg-gray-1 border-gray-3'
                        } flex items-center justify-center w-10.5 h-9 rounded-[5px] border ease-out duration-200 hover:bg-blue hover:border-blue hover:text-white`}
                    >
                      <TwoSquaresIcon />
                    </button>
                  </div>
                </div>
              </div>

              {/* Products Grid Tab Content Start */}

              {products.length ? (
                <div
                  className={
                    productStyle === 'grid'
                      ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-7.5 gap-y-9'
                      : 'flex flex-col gap-7.5'
                  }
                >
                  {products.map((product) => {
                    return productStyle === 'grid' ? (
                      <SingleGridItem key={product._id} item={product} />
                    ) : (
                      <SingleListItem key={product._id} item={product} />
                    );
                  })}
                </div>
              ) : (
                <ProductsEmptyState />
              )}
            </div>
            {/* Content End */}
          </div>
        </div>
      </section>
    </>
  );
};

export default ShopWithSidebar;
