'use client';
import { usePreviewSlider } from '@/app/context/PreviewSliderContext';
import {
  CheckMarkIcon,
  CircleCheckIcon,
  FullScreenIcon,
  HeartIcon,
  MinusIcon,
  PlusIcon,
} from '@/assets/icons';
import { updateproductDetails } from '@/redux/features/product-details';
import { AppDispatch } from '@/redux/store';
import { imageBuilder } from '@/sanity/sanity-shop-utils';
import { Product } from '@/types/product';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useShoppingCart } from 'use-shopping-cart';
import Breadcrumb from '../Common/Breadcrumb';
import Newsletter from '../Common/Newsletter';
import PreLoader from '../Common/PreLoader';
import ReviewStar from '../Shop/ReviewStar';
import DetailsTabs from './DetailsTabs';
import RecentlyViewedItems from './RecentlyViewd';

type SelectedAttributesType = {
  [key: number]: string | undefined;
};

const ShopDetails = ({ product }: { product: Product }) => {
  const { openPreviewModal } = usePreviewSlider();
  const [previewImg, setPreviewImg] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [activeColor, setActiveColor] = useState('');
  const [reviews, setReviews] = useState<[]>([]);

  const { addItem, cartDetails } = useShoppingCart();

  const isAlradyAdded = Object.values(cartDetails ?? {}).some(
    (cartItem) => cartItem.id.toString() === product._id.toString()
  )
    ? true
    : false;

  const dispatch = useDispatch<AppDispatch>();

  const cartItem = {
    id: product._id,
    name: product.name,
    price: product.discountedPrice * 100,
    currency: 'usd',
    image: product?.previewImages
      ? imageBuilder(product?.previewImages[0]?.image).url()
      : '',
    price_id: product?.price_id,
  };

  // pass the product here when you get the real data.
  const handlePreviewSlider = () => {
    dispatch(updateproductDetails(product));
    openPreviewModal();
  };

  const handleCheckout = async () => {
    // @ts-ignore
    addItem(cartItem);

    try {
      const response = await fetch('/api/checkout', {
        method: 'POST',
        body: JSON.stringify([
          {
            ...cartItem,
            quantity,
          },
        ]),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const data = await response.json();
      if (data?.url) {
        window.location.href = data?.url;
      }
    } catch (error: any) {
      console.log(error.message);
    }
  };

  const handleAddToCart = async () => {
    // @ts-ignore
    addItem(cartItem);
  };

  const [selectedAttributes, setSelectedAttributes] =
    useState<SelectedAttributesType>({});

  // Function to toggle the selected attribute for a specific item
  const toggleSelectedAttribute = (itemIndex: number, attributeId: string) => {
    setSelectedAttributes((prevSelected) => ({
      ...prevSelected,
      [itemIndex]: attributeId,
    }));
  };

  useEffect(() => {
    if (product?._id) {
      fetch('/api/review', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ productID: product._id }),
      })
        .then((res) => res.json())
        .then((data) => {
          setReviews(data.review || []);
        })
        .catch((error) => {
          console.error('Error fetching reviews:', error);
        });
    }
  }, [product?._id]);

  return (
    <>
      <Breadcrumb title={'Shop Details'} pages={['shop details']} />
      {product ? (
        <>
          <section className="overflow-hidden relative pb-20 pt-5 lg:pt-20 xl:pt-28">
            <div className="max-w-[1170px] w-full mx-auto px-4 sm:px-8 xl:px-0">
              <div className="flex flex-col lg:flex-row gap-7.5 xl:gap-17.5">
                <div className="lg:max-w-[570px] w-full">
                  <div className="lg:min-h-[512px] rounded-lg shadow-1 bg-gray-2 p-4 sm:p-7.5 relative flex items-center justify-center">
                    <div>
                      <button
                        onClick={handlePreviewSlider}
                        aria-label="button for zoom"
                        className="gallery__Image w-11 h-11 rounded-[5px] bg-gray-1 shadow-1 flex items-center justify-center ease-out duration-200 text-dark hover:text-blue absolute top-4 lg:top-6 right-4 lg:right-6 z-50"
                      >
                        <FullScreenIcon />
                      </button>

                      <Image
                        src={
                          imageBuilder(
                            product?.previewImages[previewImg]?.image
                          ).url()!
                        }
                        alt={product.name}
                        width={400}
                        height={400}
                      />
                    </div>
                  </div>

                  <div className="flex flex-wrap sm:flex-nowrap gap-4.5 mt-6">
                    {product.thumbnails.map((item: any, key: any) => (
                      <button
                        onClick={() => setPreviewImg(key)}
                        key={key}
                        className={`flex items-center justify-center w-15 sm:w-25 h-15 sm:h-25 overflow-hidden rounded-lg bg-gray-2 shadow-1 ease-out duration-200 border-2 hover:border-blue ${key === previewImg
                            ? 'border-blue'
                            : 'border-transparent'
                          }`}
                      >
                        <Image
                          width={50}
                          height={50}
                          src={imageBuilder(item?.image).url()!}
                          alt="thumbnail"
                        />
                      </button>
                    ))}
                  </div>
                </div>

                {/* <!-- product content --> */}
                <div className="max-w-[559px] w-full">
                  <div className="flex items-center justify-between mb-3">
                    <h2 className="font-semibold text-xl sm:text-2xl xl:text-custom-3 text-dark">
                      {product.name}
                    </h2>

                    <div className="inline-flex font-medium text-custom-sm text-white bg-blue rounded-sm py-0.5 px-2.5">
                      30% OFF
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center gap-5.5 mb-4.5">
                    <div className="flex items-center gap-2.5">
                      {/* <!-- stars --> */}
                      <ReviewStar reviews={reviews?.length} />

                      <span> ( {reviews.length} customer reviews ) </span>
                    </div>

                    <div className="flex items-center gap-1.5">
                      {product.status ? (
                        <>
                          <CircleCheckIcon className="fill-green" />
                          <span className="text-green"> In Stock </span>
                        </>
                      ) : (
                        <>
                          <span className="text-red"> Out of Stock </span>
                        </>
                      )}
                    </div>
                  </div>

                  <h3 className="font-medium text-custom-1 mb-4.5">
                    <span className="text-dark mr-2">
                      Price: ${product.discountedPrice}
                    </span>
                    <span className="line-through">${product.price}</span>
                  </h3>

                  <ul className="flex flex-col gap-2">
                    {product.offers?.map((offer, key) => (
                      <li key={key} className="flex items-center gap-2.5">
                        <CircleCheckIcon className="fill-[#3C50E0]" />
                        {offer}
                      </li>
                    ))}
                  </ul>

                  <form onSubmit={(e) => e.preventDefault()}>
                    <div className="flex flex-col gap-4.5 border-y border-gray-3 mt-7.5 mb-9 py-9">
                      {/* <!-- details item --> */}
                      <div className="flex items-center gap-4">
                        <div className="min-w-[65px]">
                          <h4 className="font-medium text-dark">Color:</h4>
                        </div>

                        <div className="flex items-center gap-2.5">
                          {product?.colors?.map((color, key) => (
                            <label
                              key={key}
                              htmlFor={color}
                              className="cursor-pointer select-none flex items-center"
                            >
                              <div className="relative">
                                <input
                                  type="radio"
                                  name="color"
                                  id={color}
                                  className="sr-only"
                                  onChange={() => {
                                    setActiveColor(color);
                                    setPreviewImg(key);
                                  }}
                                />
                                <div
                                  className={`flex items-center justify-center w-5.5 h-5.5 rounded-full ${activeColor === color && 'border'
                                    }`}
                                  style={{ borderColor: `${color}` }}
                                >
                                  <span
                                    className="block w-3 h-3 rounded-full"
                                    style={{ backgroundColor: `${color}` }}
                                  ></span>
                                </div>
                              </div>
                            </label>
                          ))}
                        </div>
                      </div>

                      {product?.customAttributes?.map((item, itemIndex) => (
                        <div
                          key={itemIndex}
                          className="flex items-center gap-4"
                        >
                          <div className="min-w-[65px]">
                            <h4 className="font-medium text-dark">
                              {item?.attributeName}:
                            </h4>
                          </div>
                          <div className="flex items-center gap-4">
                            {item.attributeValues.map((value, valueIndex) => (
                              <label
                                key={valueIndex}
                                className="flex cursor-pointer select-none items-center"
                              >
                                <div className="relative">
                                  <input
                                    type="checkbox"
                                    name={`attribute_${itemIndex}`}
                                    onChange={() =>
                                      toggleSelectedAttribute(
                                        itemIndex,
                                        value.id
                                      )
                                    }
                                    className="sr-only"
                                    checked={
                                      selectedAttributes[itemIndex] === value.id
                                    }
                                  />
                                  <div
                                    className={`mr-2 flex h-4 w-4 items-center justify-center rounded border ${selectedAttributes[itemIndex] === value.id
                                        ? 'border-blue bg-blue'
                                        : 'border-gray-4'
                                      } `}
                                  >
                                    <span
                                      className={
                                        selectedAttributes[itemIndex] ===
                                          value.id
                                          ? 'opacity-100'
                                          : 'opacity-0'
                                      }
                                    >
                                      <CheckMarkIcon />
                                    </span>
                                  </div>
                                </div>
                                {value.title}
                              </label>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="flex flex-wrap items-center gap-4.5">
                      <div className="flex items-center rounded-md border border-gray-3">
                        <button
                          aria-label="button for remove product"
                          className="flex items-center justify-center w-12 h-12 ease-out duration-200 hover:text-blue"
                          onClick={() =>
                            quantity > 1 && setQuantity(quantity - 1)
                          }
                        >
                          <MinusIcon />
                        </button>

                        <span className="flex items-center justify-center w-16 h-12 border-x border-gray-4">
                          {quantity}
                        </span>

                        <button
                          onClick={() => setQuantity(quantity + 1)}
                          aria-label="button for add product"
                          className="flex items-center justify-center w-12 h-12 ease-out duration-200 hover:text-blue"
                        >
                          <PlusIcon />
                        </button>
                      </div>

                      <button
                        onClick={() => handleCheckout()}
                        className="inline-flex font-medium text-white bg-blue py-3 px-7 rounded-md ease-out duration-200 hover:bg-blue-dark"
                      >
                        Purchase Now
                      </button>
                      <button
                        onClick={() => handleAddToCart()}
                        disabled={isAlradyAdded ? true : false}
                        className={`inline-flex font-medium text-white bg-dark py-3 px-7 rounded-md ease-out duration-200 hover:bg-dark-2 ${isAlradyAdded && 'cursor-not-allowed bg-dark-2'}`}
                      >
                        {isAlradyAdded ? 'Added' : 'Add to Cart'}
                      </button>

                      <Link
                        href="#"
                        className="flex items-center justify-center w-12 h-12 rounded-md border border-gray-3 ease-out duration-200 hover:text-white hover:bg-dark hover:border-transparent"
                      >
                        <HeartIcon />
                      </Link>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </section>

          <DetailsTabs product={product} />

          <RecentlyViewedItems />

          <Newsletter />
        </>
      ) : (
        <PreLoader />
      )}
    </>
  );
};

export default ShopDetails;
