import { MinusIcon, PlusIcon, TrashIcon } from '@/assets/icons';
import cn from '@/utils/cn';
import Image from 'next/image';
import Link from 'next/link';
import { useShoppingCart } from 'use-shopping-cart';

const SingleItem = ({ item }: any) => {
  const { incrementItem, decrementItem, removeItem } = useShoppingCart();

  const handleRemoveFromCart = () => {
    removeItem(item.id);
  };

  const handleIncreaseQuantity = () => {
    incrementItem(item.id);
  };

  const handleDecreaseQuantity = () => {
    if (item.quantity > 1) {
      decrementItem(item.id);
    }
  };

  return (
    <div className="flex items-center border-t border-gray-3 py-5 px-7.5">
      <div className="min-w-[400px]">
        <div className="flex items-center justify-between gap-5">
          <div className="w-full flex items-center gap-5.5">
            <div className="flex items-center justify-center rounded-[5px] bg-gray-2 max-w-[80px] w-full h-17.5">
              <Image
                width={200}
                height={200}
                src={item.image}
                alt={item.name}
              />
            </div>

            <div>
              <h3 className="text-dark ease-out duration-200 hover:text-blue">
                <Link href={`/products/${item.slug}`}> {item.name} </Link>
              </h3>
            </div>
          </div>
        </div>
      </div>

      <div className="min-w-[180px]">
        <p className="text-dark">{item.formattedPrice}</p>
      </div>

      <div className="min-w-[275px]">
        <div className="w-max flex items-center rounded-md border border-gray-3">
          <button
            onClick={() => handleDecreaseQuantity()}
            aria-label="button for remove product"
            className={cn("flex items-center justify-center w-11.5 h-11.5 ease-out duration-200 hover:text-blue", {
              "opacity-50 pointer-events-none": item.quantity === 1,
            })}
            disabled={item.quantity === 1}
          >
            <MinusIcon />
          </button>

          <span className="flex items-center justify-center w-16 h-11.5 border-x border-gray-4">
            {item.quantity}
          </span>

          <button
            onClick={() => handleIncreaseQuantity()}
            aria-label="button for add product"
            className="flex items-center justify-center w-11.5 h-11.5 ease-out duration-200 hover:text-blue"
          >
            <PlusIcon />
          </button>
        </div>
      </div>

      <div className="min-w-[200px]">
        <p className="text-dark">${(item.price / 100) * item.quantity}</p>
      </div>

      <div className="min-w-[50px] flex justify-end">
        <button
          onClick={() => handleRemoveFromCart()}
          aria-label="button for remove product from cart"
          className="flex items-center justify-center rounded-lg max-w-[38px] w-full h-9.5 bg-gray-2 border border-gray-3 text-dark ease-out duration-200 hover:bg-red-light-6 hover:border-red-light-4 hover:text-red"
        >
          <TrashIcon />
        </button>
      </div>
    </div>
  );
};

export default SingleItem;
