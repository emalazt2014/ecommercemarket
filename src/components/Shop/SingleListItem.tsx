'use client';
import { useModalContext } from '@/app/context/QuickViewModalContext';
import { EyeIcon, HeartFilledIcon, HeartIcon } from '@/assets/icons';
import { updateQuickView } from '@/redux/features/quickView-slice';
import { addItemToWishlist } from '@/redux/features/wishlist-slice';
import { AppDispatch, useAppSelector } from '@/redux/store';
import { imageBuilder } from '@/sanity/sanity-shop-utils';
import { Product } from '@/types/product';
import Image from 'next/image';
import Link from 'next/link';
import toast from 'react-hot-toast';
import { useDispatch } from 'react-redux';
import { useShoppingCart } from 'use-shopping-cart';
import CheckoutBtn from './CheckoutBtn';
import ReviewStar from './ReviewStar';

const SingleListItem = ({ item }: { item: Product }) => {
  const { openModal } = useModalContext();
  const dispatch = useDispatch<AppDispatch>();

  const { addItem, cartDetails } = useShoppingCart();
  const wishlistItems = useAppSelector((state) => state.wishlistReducer.items);

  const isItemInCart = Object.values(cartDetails ?? {}).some(
    (cartItem) => cartItem.id.toString() === item._id.toString()
  );

  const isItemInWishlist = Object.values(wishlistItems ?? {}).some(
    (wishlistItem) => wishlistItem._id.toString() === item._id.toString()
  );

  const cartItem = {
    id: item._id,
    name: item.name,
    price: item.discountedPrice * 100,
    currency: 'usd',
    image: item?.previewImages
      ? imageBuilder(item?.previewImages[0]?.image).url()
      : '',
    price_id: null,
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

  return (
    <div className="group rounded-lg bg-white shadow-1">
      <div className="flex">
        <div className="shadow-list relative overflow-hidden flex items-center justify-center max-w-[270px] w-full sm:min-h-[270px] p-4">
          {
            <Link href={`/products/${item?.slug?.current}`}>
              <Image
                src={imageBuilder(item?.previewImages[0]?.image).url() || ''}
                alt={item.name}
                className="object-cover"
                width={270}
                height={270}
              />
            </Link>
          }

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

            {isItemInCart ? (
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
              className="flex items-center justify-center w-9 h-9 rounded-[5px] shadow-1 ease-out duration-200 text-dark bg-white hover:text-blue"
            >
              {isItemInWishlist ? (
                <HeartFilledIcon />
              ) : (
                <HeartIcon className="size-4" />
              )}
            </button>
          </div>
        </div>

        <Link
          href={`/products/${item?.slug?.current}`}
          className="w-full flex flex-col gap-5 sm:flex-row sm:items-center justify-center sm:justify-between py-5 px-4 sm:px-7.5 lg:pl-11 lg:pr-12"
        >
          <div>
            <h3 className="font-medium text-dark ease-out duration-200 hover:text-blue mb-1.5">
              {item.name}
            </h3>

            <span className="flex items-center gap-2 font-medium text-lg">
              <span className="text-dark">${item.discountedPrice}</span>
              <span className="text-dark-4 line-through">${item.price}</span>
            </span>
          </div>

          <div className="flex items-center gap-2.5 mb-2">
            <ReviewStar reviews={item.reviews.length} />

            <p className="text-custom-sm">({item?.reviews.length || 0})</p>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default SingleListItem;
