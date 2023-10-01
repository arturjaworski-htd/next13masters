import { type CartOrderItemFragment } from "@/gql/graphql";
import { CartListItem } from "@/ui/molecules/CartListItem";

export const CartList = ({ items }: { items: CartOrderItemFragment[] }) => {
	return (
		<ul className="flex w-full flex-col gap-4" role="list">
			{items.map((item) => {
				return <CartListItem key={item.id} item={item} />;
			})}
		</ul>
	);
};
