import { revalidateTag } from "next/cache";
import { AddToCartButton } from "./AddToCartButton";
import { type ProductListItemFragment } from "@/gql/graphql";
import { formatMoney } from "@/utils";
import { getOrCreateCart, addProductToCart } from "@/api/cart";

type ProductDescriptionProps = {
	product: ProductListItemFragment;
};

export const ProductDescription = ({
	product: { id, name, price, description },
}: ProductDescriptionProps) => {
	async function addProductToCartAction() {
		"use server";
		const cart = await getOrCreateCart();
		await addProductToCart(cart.id, id);

		revalidateTag("cart");
	}

	return (
		<div className="flex flex-col gap-6">
			<h1 className="text-2xl font-bold text-slate-900">{name}</h1>

			<p className="text-lg font-medium text-slate-900">
				<span className="sr-only">Price:</span>
				{formatMoney(price / 100)}
			</p>

			<p className="text-sm text-slate-500">{description}</p>

			<form action={addProductToCartAction}>
				<AddToCartButton />
			</form>
		</div>
	);
};
