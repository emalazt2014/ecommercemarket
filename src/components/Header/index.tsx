"use client";
import { CallIcon, CartIcon, HeartIcon, LoopIcon, SearchIcon } from '@/assets/icons';
import { useSession } from 'next-auth/react';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useShoppingCart } from 'use-shopping-cart';
import GlobalSearchModal from '../Common/GlobalSearch';
import { UserIcon } from '../MyAccount/icons';
import CustomSelect from './CustomSelect';
import Dropdown from './Dropdown';
import { menuData } from './menuData';

const Header = () => {
  const [navigationOpen, setNavigationOpen] = useState(false);
  const [stickyMenu, setStickyMenu] = useState(false);
  const [searchModalOpen, setSearchModalOpen] = useState(false);

  const { data: session } = useSession();

  const { handleCartClick, cartCount, totalPrice } = useShoppingCart();

  const handleOpenCartModal = () => {
    handleCartClick();
  };

  // Sticky menu
  const handleStickyMenu = () => {
    if (window.scrollY >= 80) {
      setStickyMenu(true);
    } else {
      setStickyMenu(false);
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleStickyMenu);
  });

  return (
    <>
      <header
        className={`fixed left-0 top-0 w-full z-999 bg-white transition-all ease-in-out duration-300 ${stickyMenu && 'shadow-sm'
          }`}
      >
        <div className="max-w-[1170px] mx-auto px-4 sm:px-7.5 xl:px-0">
          {/* <!-- header top start --> */}
          <div
            className={`flex flex-col lg:flex-row gap-5 items-end lg:items-center xl:justify-between ease-out duration-200 ${stickyMenu ? 'py-4' : 'py-6'
              }`}
          >
            {/* <!-- header top left --> */}
            <div className="xl:w-auto flex-col sm:flex-row w-full flex sm:justify-between sm:items-center gap-5 sm:gap-10">
              <Link className="shrink-0" href="/">
                <Image
                  src="/images/logo/logo.svg"
                  alt="Logo"
                  width={219}
                  height={36}
                />
              </Link>

              <div className="max-w-[475px] w-full">
                <form onSubmit={(e) => e.preventDefault()}>
                  <div className="flex items-center">
                    <CustomSelect />

                    <div className="relative max-w-[333px] sm:min-w-[333px] w-full">
                      {/* <!-- divider --> */}
                      <span className="absolute left-0 top-1/2 -translate-y-1/2 inline-block w-px h-5.5 bg-gray-4"></span>
                      <input
                        onClick={() => {
                          setSearchModalOpen(true);
                        }}
                        defaultValue={''}
                        type="search"
                        name="search"
                        id="search"
                        placeholder="I am shopping for..."
                        autoComplete="off"
                        className="custom-search w-full rounded-r-[5px] bg-gray-1 border-l-0! border border-gray-3 py-2.5 pl-4 pr-10 outline-hidden ease-in duration-200"
                      />

                      <button
                        type="submit"
                        id="search-btn"
                        aria-label="Search"
                        className="flex items-center justify-center absolute right-3 top-1/2 -translate-y-1/2 ease-in duration-200 hover:text-blue"
                      >
                        <SearchIcon />
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>

            {/* <!-- header top right --> */}
            <div className="flex w-full lg:w-auto items-center gap-7.5">
              <div className="hidden xl:flex items-center gap-3.5">
                <CallIcon width={24} height={24} className="fill-blue" />

                <div>
                  <span className="block text-2xs text-dark-4 uppercase">
                    24/7 SUPPORT
                  </span>
                  <p className="font-medium text-custom-sm text-dark">
                    (+965) 7492-3477
                  </p>
                </div>
              </div>

              {/* <!-- divider --> */}
              <span className="hidden xl:block w-px h-7.5 bg-gray-4"></span>

              <div className="flex w-full lg:w-auto justify-between items-center gap-5">
                <div className="flex items-center gap-5">
                  <Link
                    href={`${session?.user ? '/my-account' : '/signin'}`}
                    className="flex items-center gap-2.5"
                  >
                    <UserIcon className="fill-blue" />

                    <div className="group">
                      <span className="block text-2xs text-dark-4 uppercase">
                        account
                      </span>

                      <p className="font-medium text-custom-sm text-dark hover:text-blue">
                        {session?.user.name?.split(' ')[0] || 'Sign In'}
                      </p>
                    </div>
                  </Link>

                  <button
                    onClick={handleOpenCartModal}
                    className="flex items-center gap-2.5"
                  >
                    <span className="inline-block relative">
                      <CartIcon className="fill-blue" />
                      <span className="flex items-center justify-center font-medium text-2xs absolute -right-2 -top-2.5 bg-blue w-4.5 h-4.5 rounded-full text-white">
                        {cartCount}
                      </span>
                    </span>

                    <div>
                      <span className="block text-2xs text-dark-4 uppercase">
                        cart
                      </span>
                      <p className="font-medium text-custom-sm text-dark">
                        ${totalPrice && totalPrice / 100}
                      </p>
                    </div>
                  </button>
                </div>

                {/* <!-- Hamburger Toggle BTN --> */}
                <button
                  id="Toggle"
                  aria-label="Toggler"
                  className="xl:hidden block"
                  onClick={() => setNavigationOpen(!navigationOpen)}
                >
                  <span className="block relative cursor-pointer w-5.5 h-5.5">
                    <span className="du-block absolute right-0 w-full h-full">
                      <span
                        className={`block relative top-0 left-0 bg-dark rounded-sm w-0 h-0.5 my-1 ease-in-out duration-200 delay-0 ${!navigationOpen && 'w-full! delay-300'
                          }`}
                      ></span>
                      <span
                        className={`block relative top-0 left-0 bg-dark rounded-sm w-0 h-0.5 my-1 ease-in-out duration-200 delay-150 ${!navigationOpen && 'w-full! delay-400'
                          }`}
                      ></span>
                      <span
                        className={`block relative top-0 left-0 bg-dark rounded-sm w-0 h-0.5 my-1 ease-in-out duration-200 delay-200 ${!navigationOpen && 'w-full! delay-500'
                          }`}
                      ></span>
                    </span>

                    <span className="block absolute right-0 w-full h-full rotate-45">
                      <span
                        className={`block bg-dark rounded-sm ease-in-out duration-200 delay-300 absolute left-2.5 top-0 w-0.5 h-full ${!navigationOpen && 'h-0! delay-0 '
                          }`}
                      ></span>
                      <span
                        className={`block bg-dark rounded-sm ease-in-out duration-200 delay-400 absolute left-0 top-2.5 w-full h-0.5 ${!navigationOpen && 'h-0! dealy-200'
                          }`}
                      ></span>
                    </span>
                  </span>
                </button>
                {/* //   <!-- Hamburger Toggle BTN --> */}
              </div>
            </div>
          </div>
          {/* <!-- header top end --> */}
        </div>

        <div className="border-t border-gray-3">
          <div className="max-w-[1170px] mx-auto px-4 sm:px-7.5 xl:px-0">
            <div className="flex items-center justify-between">
              {/* <!--=== Main Nav Start ===--> */}
              <div
                className={`w-[288px] absolute right-4 top-full xl:static xl:w-auto h-0 xl:h-auto invisible xl:visible xl:flex items-center justify-between ${navigationOpen &&
                  `visible! bg-white shadow-lg border border-gray-3 h-auto! max-h-[400px] overflow-y-scroll rounded-md p-5`
                  }`}
              >
                {/* <!-- Main Nav Start --> */}
                <nav>
                  <ul className="flex xl:items-center flex-col xl:flex-row gap-5 xl:gap-6">
                    {menuData.map((menuItem, i) =>
                      menuItem.submenu ? (
                        <Dropdown
                          key={i}
                          menuItem={menuItem}
                          stickyMenu={stickyMenu}
                        />
                      ) : (
                        <li
                          key={i}
                          className="group relative before:w-0 before:h-[3px] before:bg-blue before:absolute before:left-0 before:top-0 before:rounded-b-[3px] before:ease-out before:duration-200 hover:before:w-full "
                        >
                          <Link
                            href={menuItem.path!}
                            className={`hover:text-blue text-custom-sm font-medium text-dark flex ${stickyMenu ? 'xl:py-4' : 'xl:py-6'
                              }`}
                          >
                            {menuItem.title}
                          </Link>
                        </li>
                      )
                    )}
                  </ul>
                </nav>
                {/* //   <!-- Main Nav End --> */}
              </div>
              {/* // <!--=== Main Nav End ===--> */}

              {/* // <!--=== Nav Right Start ===--> */}
              <div className="hidden xl:block">
                <ul className="flex items-center gap-5.5">
                  <li className="py-4">
                    <Link
                      href="#"
                      className="flex items-center gap-1.5 font-medium text-custom-sm text-dark hover:text-blue"
                    >
                      <LoopIcon />
                      Recently Viewed
                    </Link>
                  </li>

                  <li className="py-4">
                    <Link
                      href="/wishlist"
                      className="flex items-center gap-1.5 font-medium text-custom-sm text-dark hover:text-blue"
                    >
                      <HeartIcon className="size-4" />
                      Wishlist
                    </Link>
                  </li>
                </ul>
              </div>
              {/* <!--=== Nav Right End ===--> */}
            </div>
          </div>
        </div>
      </header>

      {searchModalOpen && (
        <GlobalSearchModal
          searchModalOpen={searchModalOpen}
          setSearchModalOpen={setSearchModalOpen}
        />
      )}
    </>
  );
};

export default Header;
