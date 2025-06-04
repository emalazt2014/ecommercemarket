'use client';
import { useModalContext } from '@/app/context/QuickViewModalContext';
import { EyeIcon, HeartFilledIcon, HeartIcon } from '@/assets/icons';
import { updateproductDetails } from '@/redux/features/product-details';
import { updateQuickView } from '@/redux/features/quickView-slice';
import { addItemToWishlist } from '@/redux/features/wishlist-slice';
import { AppDispatch, useAppSelector } from '@/redux/store';
import { getProduct, imageBuilder } from '@/sanity/sanity-shop-utils';
import { Product } from '@/types/product';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { useDispatch } from 'react-redux';
import { useShoppingCart } from 'use-shopping-cart';
import CheckoutBtn from '../Shop/CheckoutBtn';
import ReviewStar from '../Shop/ReviewStar';

// add updated the type here
const ProductItem = ({ item }: { item: Product }) => {
  const { openModal } = useModalContext();
  const [product, setProduct] = useState({});
  const dispatch = useDispatch<AppDispatch>();

  const { addItem, cartDetails } = useShoppingCart();
  const wishlistItems = useAppSelector((state) => state.wishlistReducer.items);

  const pathUrl = usePathname();

  const isAlradyAdded = Object.values(cartDetails ?? {}).some(
    (cartItem) => cartItem.id.toString() === item._id.toString()
  );

  const isAlradyWishListed = Object.values(wishlistItems ?? {}).some(
    (wishlistItem) => wishlistItem._id.toString() === item._id.toString()
  );

  const cartItem = {
    id: item._id,
    name: item.name,
    price: item.discountedPrice * 100,
    currency: 'usd',
    image: item?.thumbnails
      ? imageBuilder(item?.thumbnails[0]?.image).url()
      : '',
    price_id: null,
    slug: item?.slug?.current,
  };

  // update the QuickView state
  const handleQuickViewUpdate = () => {
    dispatch(updateQuickView({ ...item }));
  };

  // add to cart
  const handleAddToCart = () => {
    // @ts-ignore
    addItem(cartItem);

    toast.success('Product added to cart!');
  };

  const handleItemToWishList = () => {
    dispatch(
      addItemToWishlist({
        ...item,
        quantity: 1,
      })
    );
    toast.success('Product added to wishlist!');
  };

  const handleProductDetails = () => {
    dispatch(updateproductDetails({ ...product }));
  };

  useEffect(() => {
    const fetchProduct = async () => {
      const data = await getProduct(item?.slug?.current!);
      setProduct(data);
    };

    fetchProduct();
  }, [setProduct, item.slug]);

  return (
    <div className="group">
      <div className="relative overflow-hidden flex items-center justify-center rounded-lg bg-[#F6F7FB] min-h-[270px] mb-4">
        <Link
          href={`${
            pathUrl.includes('products')
              ? `${item?.slug?.current}`
              : `products/${item?.slug?.current}`
          }`}
        >
          <Image
            src={
              item?.previewImages
                ? imageBuilder(item?.previewImages[0]?.image).url()!
                : ''
            }
            alt={item.name}
            width={250}
            height={250}
          />
        </Link>

        <div className="absolute left-0 bottom-0 translate-y-full w-full flex items-center justify-center gap-2.5 pb-5 ease-linear duration-200 group-hover:translate-y-0">
          <button
            onClick={() => {
              openModal();
              handleQuickViewUpdate();
            }}
            aria-label="button for quick view"
            className="flex items-center justify-center w-9 h-9 rounded-[5px] shadow-1 ease-out duration-200 text-dark bg-white hover:text-blue"
          >
            <EyeIcon />
          </button>

          {isAlradyAdded ? (
            <CheckoutBtn />
          ) : (
            <button
              onClick={() => handleAddToCart()}
              className="inline-flex font-medium text-custom-sm py-[7px] px-5 rounded-[5px] bg-blue text-white ease-out duration-200 hover:bg-blue-dark"
            >
              Add to cart
            </button>
          )}

          <button
            onClick={() => handleItemToWishList()}
            aria-label="button for favorite select"
            className={`flex items-center justify-center w-9 h-9 rounded-[5px] shadow-1 ease-out duration-200 text-dark bg-white hover:text-blue`}
          >
            {isAlradyWishListed ? (
              <HeartFilledIcon />
            ) : (
              <HeartIcon width={16} height={16} />
            )}
          </button>
        </div>
      </div>

      <div className="flex items-center gap-2.5 mb-2">
        <ReviewStar reviews={item?.reviews?.length} />

        <p className="text-custom-sm">({item.reviews.length})</p>
      </div>

      <h3
        className="font-medium text-dark ease-out duration-200 hover:text-blue mb-1.5"
        onClick={() => handleProductDetails()}
      >
        <Link
          href={`${
            pathUrl.includes('products')
              ? `${item?.slug?.current}`
              : `products/${item?.slug?.current}`
          }`}
        >
          {' '}
          {item.name}{' '}
        </Link>
      </h3>

      <span className="flex items-center gap-2 font-medium text-lg">
        <span className="text-dark">${item.discountedPrice}</span>
        <span className="text-dark-4 line-through">${item.price}</span>
      </span>
    </div>
  );
};

export default ProductItem;
