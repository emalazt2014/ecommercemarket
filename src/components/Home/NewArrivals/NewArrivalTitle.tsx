import { HandBagIcon } from '@/assets/icons';
import Link from 'next/link';

export default function NewArrivalTitle() {
  return (
    <div className="mb-7 flex items-center justify-between">
      <div>
        <span className="flex items-center gap-2.5 font-medium text-dark mb-1.5">
          <HandBagIcon />
          This Week&#39;s
        </span>
        <h2 className="font-semibold text-xl xl:text-heading-5 text-dark">
          New Arrivals
        </h2>
      </div>

      <Link
        href="/shop-with-sidebar"
        className="inline-flex font-medium text-custom-sm py-2.5 px-7 rounded-md border-gray-3 border bg-gray-1 text-dark ease-out duration-200 hover:bg-dark hover:text-white hover:border-transparent"
      >
        View All
      </Link>
    </div>
  );
}
