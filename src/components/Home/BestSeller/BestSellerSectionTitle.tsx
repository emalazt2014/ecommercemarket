import { CartBegIcon } from '@/assets/icons'

export default function BestSellerSectionTitle() {
  return (
    <div className="mb-10 flex items-center justify-between">
      <div>
        <span className="flex items-center gap-2.5 font-medium text-dark mb-1.5">
          <CartBegIcon className="w-4 h-4 text-blue" />
          This Month
        </span>
        <h2 className="font-semibold text-xl xl:text-heading-5 text-dark">
          Best Sellers
        </h2>
      </div>
    </div>
  )
}
