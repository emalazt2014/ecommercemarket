import SingleItem from './SingleItem';
import WishListTableHeader from './WishListTableHeader';

export default function WishListTable({ wishlistItems }: { wishlistItems: any }) {
  return (
    <div className="bg-white rounded-[10px] shadow-1">
      <div className="w-full overflow-x-auto">
        <div className="min-w-[1170px]">
          <WishListTableHeader />

          {wishlistItems.map((item: any, key: any) => (
            <SingleItem item={item} key={key} />
          ))}
        </div>
      </div>
    </div>
  );
}
