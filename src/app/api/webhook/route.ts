import { revalidatePath } from "next/cache";
import { type NextRequest } from "next/server";
import { isAuthorized } from "@/app/api/utils/hygraphUtils";

export async function POST(request: NextRequest): Promise<Response> {
	const body: unknown = await request.json();

	const isValid = await isAuthorized(body, request);

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
