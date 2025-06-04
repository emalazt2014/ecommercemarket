"use client";
import { CircleXIcon } from '@/assets/icons';
import Link from 'next/link';
import { useEffect } from 'react';
import { useShoppingCart } from 'use-shopping-cart';
import EmptyCart from './EmptyCart';
import SingleItem from './SingleItem';

const CartSidebarModal = () => {
  const {
    cartCount,
    shouldDisplayCart,
    handleCartClick,
    cartDetails,
    totalPrice,
  } = useShoppingCart();

  useEffect(() => {
    // closing modal while clicking outside
    function handleClickOutside(event: any) {
      if (!event.target.closest('.modal-content')) {
        handleCartClick();
      }
    }

    if (shouldDisplayCart) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [shouldDisplayCart, handleCartClick]);

  async function handleCheckoutClick(event: any) {
    event.preventDefault();

    try {
      const response = await fetch('/api/checkout', {
        method: 'POST',
        body: JSON.stringify(cartDetails),
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
  }

  return (
    <>
      <div
        className={`fixed top-0 left-0 z-9999 overflow-y-auto no-scrollbar w-full h-screen bg-dark/70 ease-linear duration-300 ${
          shouldDisplayCart ? 'block' : 'hidden'
        }`}
      ></div>

      {/* <div className="flex items-center justify-end"> */}
      <div
        className={`${
          shouldDisplayCart ? 'translate-x-0' : 'translate-x-full'
        } fixed z-999999 w-full h-screen max-w-[500px] ease-linear duration-300 shadow-1 bg-white px-4 sm:px-7.5 lg:px-11 top-0 right-0 modal-content flex flex-col`}
      >
        <div className="sticky top-0 bg-white flex items-center justify-between pb-7 pt-4 sm:pt-7.5 lg:pt-11 border-b border-gray-3 mb-7.5">
          <h2 className="font-medium text-dark text-lg sm:text-2xl">
            Cart View
          </h2>
          <button
            onClick={() => handleCartClick()}
            aria-label="button for close modal"
            className="flex items-center justify-center ease-in duration-150 text-dark-5 hover:text-dark"
          >
            <CircleXIcon width={30} height={30} />
          </button>
        </div>

        <div className="h-[66vh] overflow-y-auto no-scrollbar">
          <div className="flex flex-col gap-6">
            {/* <!-- cart item --> */}
            {cartCount ? (
              <>
                {Object.values(cartDetails ?? {}).map((item, key) => (
                  <SingleItem toggle={handleCartClick} key={key} item={item} />
                ))}
              </>
            ) : (
              <EmptyCart />
            )}
          </div>
        </div>

        <div className="border-t border-gray-3 bg-white pt-5 pb-4 sm:pb-7.5 lg:pb-11 sticky bottom-0 mt-auto">
          <div className="flex items-center justify-between gap-5 mb-6">
            <p className="font-medium text-xl text-dark">Subtotal:</p>

            <p className="font-medium text-xl text-dark">
              ${totalPrice && totalPrice / 100}
            </p>
          </div>

          <div className="flex items-center gap-4">
            <Link
              onClick={() => handleCartClick()}
              href="/cart"
              className="w-full flex justify-center font-medium text-white bg-blue py-[13px] px-6 rounded-md ease-out duration-200 hover:bg-blue-dark"
            >
              View Cart
            </Link>

            <button
              onClick={(e) => handleCheckoutClick(e)}
              className="w-full flex justify-center font-medium text-white bg-dark py-[13px] px-6 rounded-md ease-out duration-200 hover:bg-opacity-95"
            >
              Checkout
            </button>
          </div>
        </div>
      </div>
      {/* </div> */}
    </>
  );
};

export default CartSidebarModal;
