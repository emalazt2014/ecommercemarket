import { removeItemFromWishlist } from '@/redux/features/wishlist-slice';
import { AppDispatch } from '@/redux/store';
import { imageBuilder } from '@/sanity/sanity-shop-utils';
import Image from 'next/image';
import Link from 'next/link';
import toast from 'react-hot-toast';
import { useDispatch } from 'react-redux';
import { useShoppingCart } from 'use-shopping-cart';
import { CircleCheckIcon, CircleXIcon } from './icons';

const SingleItem = ({ item }: any) => {
  const dispatch = useDispatch<AppDispatch>();
  const { addItem } = useShoppingCart();

  const handleRemoveFromWishlist = () => {
    dispatch(removeItemFromWishlist(item._id));
  };

  const cartItem = {
    id: item.price_id,
    name: item.name,
    price: item.discountedPrice * 100,
    currency: 'usd',
    image: item?.thumbnails
      ? imageBuilder(item?.thumbnails[0]?.image).url()
      : '',
    price_id: item?.price_id,
  };

  const handleAddToCart = () => {
    // @ts-ignore
    addItem(cartItem);
    toast.success('Product added to cart!');
  };

  return (
    <div className="flex items-center border-t border-gray-3 py-5 px-10">
      <div className="min-w-[83px]">
        <button
          onClick={() => handleRemoveFromWishlist()}
          className="flex items-center justify-center rounded-lg max-w-[38px] w-full h-9.5 bg-gray-2 border border-gray-3 ease-out duration-200 hover:bg-red-light-6 hover:border-red-light-4 hover:text-red"
        >
          <span className="sr-only">Remove from wishlist</span>

          <CircleXIcon />
        </button>
      </div>

      <div className="min-w-[387px]">
        <div className="flex items-center justify-between gap-5">
          <div className="w-full flex items-center gap-5.5">
            <div
              className="flex items-center justify-center rounded-[5px] 
            bg-gray-2 max-w-[80px] w-full h-17.5"
            >
              <Image
                src={
                  item?.thumbnails
                    ? imageBuilder(item?.thumbnails[0]?.image).url()!
                    : ''
                }
                alt={item.name}
                width={200}
                height={200}
              />
            </div>

            <h3 className="text-dark ease-out duration-200 hover:text-blue">
              <Link href={`/products/${item.slug.current}`}> {item.name} </Link>
            </h3>
          </div>
        </div>
      </div>

      <div className="min-w-[205px]">
        <p className="text-dark">${item.discountedPrice}</p>
      </div>

      <div className="min-w-[265px]">
        {item?.status ? (
          <div className="flex items-center gap-1.5 text-green">
            <CircleCheckIcon />

            <span> In Stock </span>
          </div>
        ) : (
          <span className="text-red"> Out of Stock </span>
        )}
      </div>

      <div className="min-w-[150px] flex justify-end">
        <button
          onClick={() => handleAddToCart()}
          className="inline-flex text-dark hover:text-white bg-gray-1 border
        border-gray-3 py-2.5 px-6 rounded-md ease-out duration-200 hover:bg-blue"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default SingleItem;
