"use client";
import { useAppSelector } from "@/redux/store";
import Breadcrumb from "../Common/Breadcrumb";
import WishListEmpty from "./WishListEmpty";
import WishListTable from "./WishListTable";
import WishListTopbar from "./WishListTopbar";

export const Wishlist = () => {
  const wishlistItems = useAppSelector((state) => state.wishlistReducer.items);

  return (
    <>
      <Breadcrumb title={"Wishlist"} pages={["Wishlist"]} />

      <section className="overflow-hidden py-20 bg-gray-2">
        {wishlistItems.length > 0 ? (
          <div className="max-w-[1170px] w-full mx-auto px-4 sm:px-8 xl:px-0">
            <WishListTopbar />

            <WishListTable wishlistItems={wishlistItems} />
          </div>
        ) : (
          <WishListEmpty />
        )}
      </section>
    </>
  );
};
