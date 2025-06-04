import { useEffect, useState } from 'react';
import { Controller } from 'react-hook-form';
import { InputGroup } from '../ui/input';
import { useCheckoutForm } from './form';
import { ChevronDown } from './icons';

export default function Shipping() {
  const [dropdown, setDropdown] = useState(false);
  const { register, control, setValue } = useCheckoutForm();

  useEffect(() => {
    if (dropdown) {
      setValue('shipToDifferentAddress', true);
    } else {
      setValue('shipToDifferentAddress', false);
    }
  }, [dropdown]);

  return (
    <div className="bg-white shadow-1 rounded-[10px] mt-7.5 break-inside-avoid">
      <div
        onClick={() => setDropdown(!dropdown)}
        className="cursor-pointer flex items-center gap-2.5 font-medium text-lg text-dark py-5 px-5.5"
      >
        Ship to a different address?
        <ChevronDown
          className={`fill-current ease-out duration-200 ${dropdown && 'rotate-180'
            }`}
          aria-hidden
        />
      </div>

      {/* <!-- dropdown menu --> */}
      {dropdown &&
        <div className="p-4 sm:p-8.5" >
          <div className="mb-5">
            <label htmlFor="shipping-country-name" className="block mb-2.5">
              Country/ Region
              <span className="text-red">*</span>
            </label>

            <div className="relative">
              <select
                {...register('shipping.countryName')}
                id="shipping-country-name"
                className="w-full bg-gray-1 rounded-md border border-gray-3 text-dark-4 py-3 pl-5 pr-9 duration-200 appearance-none outline-hidden focus:border-transparent focus:shadow-input focus:ring-2 focus:ring-blue/20"
              >
                <option value="0">Australia</option>
                <option value="1">America</option>
                <option value="2">England</option>
              </select>

              <span className="absolute right-4 top-1/2 -translate-y-1/2 text-dark-4">
                <ChevronDown className="size-4" />
              </span>
            </div>
          </div>

          <div className="mb-5">
            <Controller
              control={control}
              name="shipping.address.street"
              render={({ field }) => (
                <InputGroup
                  label="Street Address"
                  placeholder="House number and street name"
                  required
                  name={field.name}
                  value={field.value}
                  onChange={field.onChange}
                />
              )}
            />

            <input
              type="text"
              {...register('shipping.address.apartment')}
              placeholder="Apartment, suite, unit, etc. (optional)"
              className="rounded-md mt-5 border border-gray-3 bg-gray-1 placeholder:text-dark-5 w-full py-2.5 px-5 outline-hidden duration-200 focus:border-transparent focus:shadow-input focus:ring-2 focus:ring-blue/20"
            />
          </div>

          <div className="mb-5">
            <Controller
              control={control}
              name="shipping.town"
              render={({ field }) => (
                <InputGroup
                  label="Town/City"
                  required
                  name={field.name}
                  value={field.value}
                  onChange={field.onChange}
                />
              )}
            />
          </div>

          <div className="mb-5">
            <Controller
              control={control}
              name="shipping.country"
              render={({ field }) => (
                <InputGroup
                  label="Country"
                  name={field.name}
                  value={field.value}
                  onChange={field.onChange}
                />
              )}
            />
          </div>

          <div className="mb-5">
            <Controller
              control={control}
              name="shipping.phone"
              render={({ field }) => (
                <InputGroup
                  type="tel"
                  label="Phone"
                  required
                  name={field.name}
                  value={field.value}
                  onChange={field.onChange}
                />
              )}
            />
          </div>

          <Controller
            control={control}
            name="shipping.email"
            render={({ field }) => (
              <InputGroup
                label="Email Address"
                type="email"
                required
                name={field.name}
                value={field.value}
                onChange={field.onChange}
              />
            )}
          />
        </div>}
    </div>
  );
}
