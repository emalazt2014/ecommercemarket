"use client";
import React from "react";
import { Product } from "@/types/product";
import { useModalContext } from "@/app/context/QuickViewModalContext";
import { useDispatch } from "react-redux";
import { AppDispatch, useAppSelector } from "@/redux/store";
import { updateQuickView } from "@/redux/features/quickView-slice";
import Image from "next/image";
import Link from "next/link";
import { addItemToWishlist } from "@/redux/features/wishlist-slice";
import ReviewStar from "@/components/Shop/ReviewStar";
import { imageBuilder } from "@/sanity/sanity-shop-utils";
import { useShoppingCart } from "use-shopping-cart";
import toast from "react-hot-toast";
import ActionBtn from "./ActionBtn";

const SingleItem = ({ item }: { item: Product }) => {
  const { openModal } = useModalContext();
  const dispatch = useDispatch<AppDispatch>();
  const { addItem, cartDetails } = useShoppingCart();
  const wishlistItems = useAppSelector((state) => state.wishlistReducer.items);

  const isAlradyAdded = Object.values(cartDetails ?? {}).some(
    (cartItem) => cartItem.id.toString() === item._id.toString()
  )
    ? true
    : false;

  const isAlradyWishListed = Object.values(wishlistItems ?? {}).some(
    (wishlistItem) => wishlistItem._id.toString() === item._id.toString()
  )
    ? true
    : false;

  const cartItem = {
    id: item._id,
    name: item.name,
    price: item.discountedPrice * 100,
    currency: "usd",
    image: item?.thumbnails
      ? imageBuilder(item?.thumbnails[0]?.image).url()
      : "",
    price_id: null,
    slug: item?.slug?.current,
  };

  // update the QuickView state
  const handleQuickViewUpdate = () => {
    dispatch(updateQuickView({ ...item }));
    openModal();
  };

  // add to cart
  const handleAddToCart = () => {
    // @ts-ignore
    addItem(cartItem);
    toast.success("Product added to cart!");
  };

  async function handleCheckoutClick(event: any) {
    event.preventDefault();

    try {
      const response = await fetch("/api/checkout", {
        method: "POST",
        body: JSON.stringify(cartDetails),
        headers: {
          "Content-Type": "application/json",
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

  const handleItemToWishList = () => {
    dispatch(
      addItemToWishlist({
        ...item,
        quantity: 1,
      })
    );
    toast.success("Product added to wishlist!");
  };

  return (
    <div className="group">
      <div className="relative overflow-hidden rounded-lg bg-[#F6F7FB] min-h-[403px]">
        <div className="text-center px-4 py-7.5">
          <div className="flex items-center justify-center gap-2.5 mb-2">
            <ReviewStar reviews={item.reviews.length} />

            <p className="text-custom-sm">({item.reviews.length})</p>
          </div>

          <h3 className="font-medium text-dark ease-out duration-200 hover:text-blue mb-1.5">
            <Link href={`/products/${item?.slug?.current}`}>{item.name}</Link>
          </h3>

          <span className="flex items-center justify-center gap-2 font-medium text-lg">
            <span className="text-dark">${item.discountedPrice}</span>
            <span className="text-dark-4 line-through">${item.price}</span>
          </span>
        </div>
        <div className="flex justify-center items-center">
          <Link href={`/products/${item?.slug?.current}`}>
            <Image
              src={
                item?.previewImages
                  ? imageBuilder(item?.previewImages[0]?.image).url()!
                  : ""
              }
              alt={item.name}
              width={280}
              height={280}
            />
          </Link>
        </div>

        <div className="absolute right-0 bottom-0  u-w-full flex flex-col gap-2 p-5.5 ease-linear duration-300 group-hover:translate-x-0 translate-x-full">
          <ActionBtn
            handleClick={handleQuickViewUpdate}
            text="Quick View"
            icon={"quick-view"}
          />

          {isAlradyAdded ? (
            <ActionBtn
              handleClick={handleCheckoutClick}
              text="Checkout"
              icon="check-out"
            />
          ) : (
            <ActionBtn
              handleClick={() => {
                handleAddToCart();
              }}
              text="Add to cart"
              icon="cart"
            />
          )}

          <ActionBtn
            handleClick={handleItemToWishList}
            text="Add to Wishlist"
            icon="wishlist"
            addedToWishlist={isAlradyWishListed}
          />
        </div>
      </div>
    </div>
  );
};

export default SingleItem;
