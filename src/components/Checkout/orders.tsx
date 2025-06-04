import { useShoppingCart } from 'use-shopping-cart';
import { useCheckoutForm } from './form';



export default function Orders() {
  const { watch } = useCheckoutForm();

  const {
    cartCount,
    cartDetails,
    totalPrice = 0,
  } = useShoppingCart();

  const shippingFee = watch('shippingMethod');

  const subtotal = totalPrice + shippingFee?.price;

  const couponDiscount = ((watch('couponDiscount') || 0) * totalPrice) / 100;


  return (
    <div className="bg-white shadow-1 rounded-[10px] max-lg:mt-7.5">
      <h3 className="font-medium text-xl text-dark border-b border-gray-3 py-5 px-4 sm:px-8.5">
        Your Order
      </h3>

      <div className="pt-2.5 pb-8.5 px-4 sm:px-8.5">
        <table className="w-full text-dark">
          <thead>
            <tr className="border-b border-gray-3">
              <th className="text-left font-medium py-5">Product</th>
              <th className="text-right font-medium py-5">Subtotal</th>
            </tr>
          </thead>


          <tbody>
            {cartCount && <>{Object.values(cartDetails ?? {}).map((product, key) => (
              <tr key={key} className="border-b border-gray-3">
                <td className="py-5 truncate">{product.name}</td>
                <td className="py-5 text-right">${(product.price / 100).toFixed(2)}</td>
              </tr>
            ))}</>}


            <tr className="border-b border-gray-3">
              <td className="py-5">Shipping Fee</td>
              <td className="py-5 text-right">
                ${(shippingFee.price / 100).toFixed(2)}
              </td>
            </tr>

            {!!couponDiscount && (
              <tr className="border-b border-gray-3">
                <td className="py-5">
                  Coupon Discount ({watch('couponDiscount')}%)
                </td>
                <td className="py-5 text-right">
                  - ${(couponDiscount / 100).toFixed(2)}
                </td>
              </tr>
            )}
          </tbody>
          <tfoot>
            <tr>
              <td className="pt-5 font-medium text-lg">Total</td>

              <td className="pt-5 font-medium text-lg text-right">
                ${((subtotal - couponDiscount) / 100).toFixed(2)}
              </td>
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
  );
}
