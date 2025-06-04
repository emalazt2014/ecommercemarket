'use client';
import { SidebarChevronDownIcon } from '@/assets/icons';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useState } from 'react';

type PropsType = {
  availableColors: string[];
};

export default function ColorsDropdown({ availableColors }: PropsType) {
  const [isOpen, setIsOpen] = useState(true);

  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const handleColors = (color: string, isSelected: boolean) => {
    const KEY = 'colors';

    const params = new URLSearchParams(searchParams);
    const colorsParam = params.get(KEY);

    if (isSelected) {
      params.set(KEY, colorsParam ? `${colorsParam},${color}` : color);
    } else {
      const newParam = colorsParam?.split(',').filter((id) => id !== color);

      if (newParam?.length) {
        params.set(KEY, newParam.join(','));
      } else {
        params.delete(KEY);
      }
    }

    router.replace(`${pathname}?${params.toString()}`, { scroll: false });
  };

  return (
    <div className="bg-white shadow-1 rounded-lg">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`cursor-pointer flex items-center justify-between py-3 pl-6 pr-5.5 w-full ${
          isOpen && 'shadow-filter'
        }`}
      >
        <span className="text-dark">Colors</span>

        <SidebarChevronDownIcon
          className={`text-dark ease-out duration-200 ${
            isOpen && 'rotate-180'
          }`}
        />
      </button>

      <div className="flex flex-wrap gap-2.5 p-6" hidden={!isOpen}>
        {availableColors.map((color) => (
          <label
            key={color}
            htmlFor={color}
            title={color}
            className="cursor-pointer"
          >
            <input
              type="checkbox"
              id={color}
              className="sr-only peer"
              defaultChecked={searchParams
                .get('colors')
                ?.split(',')
                .includes(color)}
              onChange={(e) => handleColors(color, e.target.checked)}
            />

            <span
              className="flex justify-center items-center size-5.5 rounded-full peer-checked:border"
              style={{
                borderColor: color === 'white' ? 'var(--color-meta-4)' : color,
              }}
            >
              <span
                className={`size-3 rounded-full ${
                  color === 'white' ? 'border border-x-meta-4' : ''
                }`}
                style={{ backgroundColor: color }}
              ></span>
            </span>
          </label>
        ))}
      </div>
    </div>
  );
}
