import { type NextRequest } from "next/server";
import { isAuthorized } from "@/app/api/utils/hygraphUtils";
import { getRaitingsByProductId } from "@/api/review";
import { changeAverageRating } from "@/api/products";

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
		body.data.__typename === "Review"
	) {
		if (
			"product" in body.data &&
			typeof body.data.product === "object" &&
			body.data.product &&
			"id" in body.data.product &&
			typeof body.data.product.id === "string" &&
			body.data.product.id
		) {
			const productId = body.data.product.id;
			const { reviews, totalCount } = await getRaitingsByProductId(productId, "PUBLISHED");

			const averageProductRating =
				reviews.reduce((acc, review) => acc + review.rating, 0) / totalCount;

			const product = await changeAverageRating(
				productId,
				parseFloat(averageProductRating.toFixed(1)),
			);

			if (product?.id) return new Response(null, { status: 204 });
		}
	}

	return new Response(null, { status: 400 });
}
