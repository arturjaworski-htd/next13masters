import { type CartOrderItemFragment } from "@/gql/graphql";
import { formatMoney } from "@/utils";

type CartSummaryProps = {
	cart: {
		id: string;
		orderItems: CartOrderItemFragment[];
	};
};

export const CartSummary = ({ cart }: CartSummaryProps) => {
	const total = cart.orderItems.reduce(
		(acc, item) => acc + (item?.product?.price || 0) * item.quantity,
		0,
	);

	return (
		<div className="flex w-full items-center justify-between rounded-lg bg-slate-200 p-4">
			<p>Order total</p>
			<span className="text-lg font-medium text-slate-700">{formatMoney(total / 100)}</span>
		</div>
	);
};
