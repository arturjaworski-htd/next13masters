import Image from "next/image";
import Link from "next/link";
import { RemoveButton } from "../atoms/RemoveButton";
import { ChangeQuantityButton } from "../atoms/ChangeQuantityButton";
import { type CartOrderItemFragment } from "@/gql/graphql";
import { formatMoney } from "@/utils";

export const CartListItem = ({ item }: { item: CartOrderItemFragment }) => {
	if (!item.product) {
		return null;
	}

	return (
		<li className="flex items-center justify-between border-b pb-4 ">
			<Link href={`/product/${item.product.id}`}>
				<div className="flex items-center space-x-4">
					<Image
						src={item.product.images?.[0]?.url || ""}
						alt={item.product.name}
						width={80}
						height={80}
						className="h-20 w-20 rounded-md"
					/>
					<div className="flex flex-col gap-1">
						<h3 className="text-lg font-medium text-gray-900">{item.product.name}</h3>
						<p className="text-sm text-slate-500">{formatMoney(item.product.price / 100)}</p>
					</div>
				</div>
			</Link>

			<div className="flex items-center gap-8">
				<ChangeQuantityButton quantity={item.quantity} itemId={item.id} />

				<RemoveButton itemId={item.id} />

				<p className="text-lg font-medium text-gray-900">
					{formatMoney((item.product.price / 100) * item.quantity)}
				</p>
			</div>
		</li>
	);
};
