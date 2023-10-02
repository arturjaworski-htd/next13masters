import { verifyWebhookSignature } from "@hygraph/utils";
import { revalidatePath } from "next/cache";
import { type NextRequest } from "next/server";

export async function POST(request: NextRequest): Promise<Response> {
	const body: unknown = await request.json();

	const signature = request.headers.get("gcms-signature");
	const secret = process.env.GRAPHQL_WEBHOOK_SECRET;

	if (!signature || !secret) {
		return new Response(null, { status: 400 });
	}

	const isValid = verifyWebhookSignature({ body: body, signature, secret });

	if (!isValid) {
		return new Response(null, { status: 400 });
	}

	if (
		typeof body === "object" &&
		body &&
		"data" in body &&
		typeof body.data === "object" &&
		body.data &&
		"id" in body.data &&
		"__typename" in body.data &&
		typeof body.data.id === "string" &&
		body.data.__typename === "Product"
	) {
		console.log(`Revalidating /product/${body.data.id}`);
		revalidatePath(`/product/${body.data.id}`);
		console.log(`Revalidating /products`);
		revalidatePath(`/products`);
		return new Response(null, { status: 204 });
	} else {
		return new Response(null, { status: 400 });
	}
}
