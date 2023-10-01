import { cookies } from "next/headers";
import { executeGraphql } from "./graphqlApi";
import {
	CartGetByIdDocument,
	CartCreateDocument,
	ProductGetByIdDocument,
	CartAddItemDocument,
} from "@/gql/graphql";
import { changeItemQuantity } from "@/app/cart/actions";

export async function getOrCreateCart() {
	const cart = await getCart();

	if (cart) {
		return cart;
	}

	const { createOrder: newCart } = await executeGraphql({
		query: CartCreateDocument,
		cache: "no-store",
	});
	if (!newCart) {
		throw new Error("Failed to create cart");
	}

	cookies().set("cartId", newCart.id);
	return newCart;
}

export async function addProductToCart(cartId: string, productId: string) {
	const { product } = await executeGraphql({
		query: ProductGetByIdDocument,
		variables: {
			id: productId,
		},
		cache: "no-store",
	});
	if (!product) {
		throw new Error(`Product with id ${productId} not found`);
	}
	const cart = await getCart();

	const item = cart?.orderItems.find((item) => item.product?.id === productId);

	if (item) {
		await changeItemQuantity(item.id, item.quantity + 1);
		return;
	}

	await executeGraphql({
		query: CartAddItemDocument,
		variables: {
			cartId,
			productId,
			total: product.price,
		},
		cache: "no-store",
	});
}

export const getCart = async () => {
	const cartId = cookies().get("cartId")?.value;

	if (!cartId) {
		return;
	}

	const cart = await executeGraphql({
		query: CartGetByIdDocument,
		variables: {
			id: cartId,
		},
		cache: "no-store",
		next: {
			tags: ["cart"],
		},
	});

	if (!cart.order) {
		return;
	}
	return cart.order;
};
