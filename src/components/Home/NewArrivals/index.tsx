import ProductItem from '@/components/Common/ProductItem';
import { allProductsQuery } from '@/sanity/queries/shop-queries';
import { sanityFetch } from '@/sanity/sanity-utils';
import { Product } from '@/types/product';
import NewArrivalTitle from './NewArrivalTitle';

const NewArrival = async () => {
  const products: Product[] = await sanityFetch({
    query: allProductsQuery,
    qParams: {},
    tags: ['product'],
  });

  return (
    <section className="overflow-hidden pt-15">
      <div className="max-w-[1170px] w-full mx-auto px-4 sm:px-8 xl:px-0">
        <NewArrivalTitle />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-7.5 gap-y-9">
          {products.slice(0, 8).map((item, key) => (
            <ProductItem item={item} key={key} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default NewArrival;
