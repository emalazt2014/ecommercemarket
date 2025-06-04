'use client';

import { usePathname, useRouter } from 'next/navigation';

export default function ClearFilters() {
  const router = useRouter();
  const pathname = usePathname();

  function handleClear() {
    router.replace(pathname, { scroll: false });
  }

  return (
    <div className="bg-white shadow-1 rounded-lg py-4 px-5">
      <div className="flex items-center justify-between">
        <p>Filters:</p>
        <button className="text-blue" onClick={handleClear}>
          Clean All
        </button>
      </div>
    </div>
  );
}
