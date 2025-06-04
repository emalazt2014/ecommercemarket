import Image from 'next/image';

const paymentsData = [
  {
    id: 1,
    image: '/images/payment/payment-01.svg',
    alt: 'visa card',
    width: 66,
    height: 22,
  },
  {
    id: 2,
    image: '/images/payment/payment-02.svg',
    alt: 'paypal',
    width: 18,
    height: 21,
  },
  {
    id: 3,
    image: '/images/payment/payment-03.svg',
    alt: 'master card',
    width: 33,
    height: 24,
  },
  {
    id: 4,
    image: '/images/payment/payment-04.svg',
    alt: 'apple pay',
    width: 52.94,
    height: 22,
  },
  {
    id: 5,
    image: '/images/payment/payment-05.svg',
    alt: 'google pay',
    width: 56,
    height: 22,
  },
];

export default function FooterBottom() {
  const year = new Date().getFullYear();

  return (
    <div className="py-5 xl:py-7.5 bg-gray-1">
      <div className="max-w-[1170px] mx-auto px-4 sm:px-8 xl:px-0">
        <div className="flex gap-5 flex-wrap items-center justify-between">
          <p className="text-dark font-medium">
            &copy; {year}. All rights reserved by Pimjo.
          </p>

          <div className="flex flex-wrap items-center gap-4">
            <p className="font-medium">We Accept:</p>

            <div className="flex flex-wrap items-center gap-6">
              {
                paymentsData.map((payment) => (
                  <Image key={payment?.id}
                    src={payment.image}
                    alt={payment.alt}
                    width={payment.width}
                    height={payment.height}
                  />
                ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
