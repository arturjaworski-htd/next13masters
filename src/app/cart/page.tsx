import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import Stripe from "stripe";
import { Wallet2 } from "lucide-react";
import { getCart } from "@/api/cart";
import { CartSummary } from "@/ui/atoms/CartSummary";
import { CartList } from "@/ui/organisms/CartList";

export default async function CartPage() {
	const cart = await getCart();

	async function handleStripePaymentAction() {
		"use server";

		if (!process.env.STRIPE_SECRET_KEY) {
			throw new Error("Missing STRIPE_SECRET_KEY env variable");
		}

		const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
			apiVersion: "2023-08-16",
			typescript: true,
		});

		const cart = await getCart();

		if (!cart) {
			return;
		}

		const cartItems = cart.orderItems
			.map(
				(item) =>
					(item.product && {
						price_data: {
							currency: "usd",
							product_data: {
								name: item.product.name,
								description: item.product.description,
								images: item.product.images.map((i) => i.url),
							},
							unit_amount: item.product.price,
						},
						quantity: item.quantity,
					}) ||
					{},
			)
			.filter(Boolean);

		const session = await stripe.checkout.sessions.create({
			mode: "payment",
			metadata: {
				cartId: cart.id,
			},
			line_items: cartItems,
			success_url: `http://localhost:3000/cart/success?session_id={CHECKOUT_SESSION_ID}`,
			cancel_url: `http://localhost:3000/cart`,
		});

		if (session.url) {
			cookies().set("cartId", "");
			redirect(session.url);
		}
	}

	if (!cart || !cart.orderItems.length) {
		return <h1 className="text-center font-medium">Your cart is empty</h1>;
	}

	return (
		<>
			<h1 className="mb-6 text-center text-2xl font-medium">Your Shopping Cart</h1>
			<div className="flex flex-col items-center justify-center gap-6">
				<CartList items={cart.orderItems} />
				<CartSummary cart={cart} />

				<form action={handleStripePaymentAction} className="w-full max-w-xs">
					<button
						type="submit"
						className="flex w-full items-center justify-center gap-2 rounded-md border bg-slate-800 px-8 py-2 text-white hover:bg-slate-600"
					>
						Pay
						<Wallet2 />
					</button>
				</form>
			</div>
		</>
	);
}
