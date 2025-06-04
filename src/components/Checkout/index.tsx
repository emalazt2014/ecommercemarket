'use client';
import { useSession } from 'next-auth/react';
import { useForm } from 'react-hook-form';
import Breadcrumb from '../Common/Breadcrumb';
import Billing from './Billing';
import Coupon from './Coupon';
import Login from './Login';
import Notes from './Notes';
import PaymentMethod from './PaymentMethod';
import Shipping from './Shipping';
import ShippingMethod from './ShippingMethod';
import { CheckoutFormProvider, CheckoutInput } from './form';
import Orders from './orders';

const Checkout = () => {
  const { register, formState, watch, control, handleSubmit, setValue } =
    useForm<CheckoutInput>({
      defaultValues: {
        shippingMethod: {
          name: 'free',
          price: 0,
        },
        paymentMethod: 'cod',
        couponDiscount: 0,
      },
    });

  const { data: session } = useSession();

  function handleCheckout(data: CheckoutInput) {
    // Handle the checkout logic here
    console.log(data);
  }

  return (
    <>
      <Breadcrumb title={'Checkout'} pages={['checkout']} />
      <section className="overflow-hidden py-20 bg-gray-2">
        <div className="max-w-[1170px] w-full mx-auto px-4 sm:px-8 xl:px-0 lg:columns-2 gap-7.5 xl:gap-11">
          {!Boolean(session?.user) && <Login />}

          <CheckoutFormProvider
            value={{
              register,
              watch,
              control,
              setValue,
              errors: formState.errors,
            }}
          >
            <form className="contents" onSubmit={handleSubmit(handleCheckout)}>
              <Billing />

              <Shipping />

              <Notes />

              <Orders />

              <Coupon />

              <ShippingMethod />

              <PaymentMethod />

              <button
                type="submit"
                className="w-full flex justify-center font-medium text-white bg-blue py-3 px-6 rounded-md ease-out duration-200 hover:bg-blue-dark mt-7.5"
              >
                Process to Checkout
              </button>
            </form>
          </CheckoutFormProvider>
        </div>
      </section>
    </>
  );
};

export default Checkout;
