import { revalidateTag } from "next/cache";
import { AddToCartButton } from "./AddToCartButton";
import { ProductVarians } from "./ProductVariants";
import {
	type ProductSizeColorVariantFragment,
	type ProductDetailsFragment,
	type ProductColorVariantFragment,
} from "@/gql/graphql";
import { formatMoney, formatRating } from "@/utils";
import { getOrCreateCart, addProductToCart } from "@/api/cart";

type ProductDescriptionProps = {
	product: ProductDetailsFragment;
};

export const ProductDescription = ({
	product: { id, name, price, description, variants, averageRating },
}: ProductDescriptionProps) => {
	async function addProductToCartAction() {
		"use server";
		const cart = await getOrCreateCart();
		await addProductToCart(cart.id, id);

		revalidateTag("cart");
	}

	const filteredVariants = variants.filter((variant) => Object.keys(variant).length > 0) as
		| ProductSizeColorVariantFragment[]
		| ProductColorVariantFragment[];

	return (
		<div className="flex grow flex-col gap-4">
			<h1 className="text-2xl font-bold text-slate-900">{name}</h1>

			<p className="text-lg font-medium text-slate-900">
				<span className="sr-only">Price:</span>
				{formatMoney(price / 100)}
			</p>

			{averageRating && (
				<p className="text-md text-slate-500">Rating: {formatRating(averageRating)}</p>
			)}

			<p className="text-sm text-slate-500">{description}</p>

			<ProductVarians variants={filteredVariants} productId={id} />

			<form action={addProductToCartAction}>
				<AddToCartButton />
			</form>
		</div>
	);
};
