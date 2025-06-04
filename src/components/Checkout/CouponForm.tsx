import { useState } from 'react';
import { useCheckoutForm } from './form';

export default function CouponForm() {
  const { setValue, watch } = useCheckoutForm();
  const [coupon, setCoupon] = useState('');

  const alreadyApplied = !!watch('couponDiscount');

  function applyCoupon() {
    // Add your coupon code logic here

    // For demonstration purposes, we are using a test coupon code
    if (coupon === 'TEST10') {
      setValue('couponDiscount', 10);
    }
  }

  return (
    <>
      <input
        type="text"
        placeholder="Enter coupon code"
        className="rounded-md border border-gray-3 bg-gray-1 placeholder:text-dark-5 w-full py-2.5 px-5 outline-hidden duration-200 focus:border-transparent focus:shadow-input focus:ring-2 focus:ring-blue/20 disabled:opacity-80"
        disabled={alreadyApplied}
        value={coupon}
        onChange={(e) => setCoupon(e.target.value)}
      />

      <button
        type='button'
        onClick={applyCoupon}
        className="inline-flex disabled:pointer-events-none disabled:opacity-80 font-medium text-white bg-blue py-3 px-6 rounded-md ease-out duration-200 hover:bg-blue-dark"
        disabled={alreadyApplied}
      >
        {alreadyApplied ? 'Applied' : 'Apply'}
      </button>
    </>
  )
}
