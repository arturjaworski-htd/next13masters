import { ImageResponse } from "next/server";
import { getProductById } from "@/api/products";

export const runtime = "edge";

export const alt = "Next 13 Product";
export const size = {
	width: 1200,
	height: 630,
};
export const contentType = "image/png";

export default async function OpenGraphImage({ params }: { params: { productId: string } }) {
	const product = await getProductById(params.productId);

	return new ImageResponse(
		(
			<div
				style={{
					fontSize: 48,
					background: "white",
					width: "100%",
					height: "100%",
					display: "flex",
					alignItems: "center",
					justifyContent: "center",
				}}
			>
				{product?.name}
				{product?.categories[0]?.name}
				{product?.description}
			</div>
		),
		{
			...size,
		},
	);
}
