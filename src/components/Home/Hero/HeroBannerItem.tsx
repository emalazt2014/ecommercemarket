import { imageBuilder } from '@/sanity/sanity-shop-utils'
import Image from 'next/image'
import Link from 'next/link'


export default function HeroBannerItem({ bannerItem }: { bannerItem: any }) {
  return (
    <div
      className="w-full relative rounded-[10px] bg-white p-4 sm:p-7.5"
    >
      <div className="flex items-center justify-between gap-5">
        <div className="max-w-[153px] w-full">
          <h2 className="max-w-[153px] font-semibold text-dark text-xl mb-20 hover:text-blue">
            <Link

              href={`/products/${bannerItem?.product?.slug.current}`}
            >
              {" "}
              {bannerItem.name}{" "}
            </Link>
          </h2>

          <div>
            <p className="font-medium text-dark-4 text-custom-sm mb-1.5">
              limited time offer
            </p>
            <span className="flex items-center gap-3">
              <span className="font-medium text-heading-5 text-red">
                ${bannerItem?.product?.discountedPrice}
              </span>
              <span className="font-medium text-2xl text-dark-4 line-through">
                ${bannerItem?.product?.price}
              </span>
            </span>
          </div>
        </div>

        <div className="max-w-[180px] w-full">
          <Image
            src={imageBuilder(bannerItem?.image).url()!}
            alt="mobile image"
            width={180}
            height={180}
          />
        </div>
      </div>
    </div>
  )
}
