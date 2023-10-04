import { ImageResponse } from "next/server";
import { getProductById } from "@/api/products";

export const runtime = "edge";
export const contentType = "image/png";

export const size = {
	width: 1024,
	height: 1024,
};

export default async function OpenGraphImage({ params }: { params: { productId: string } }) {
	const product = await getProductById(params.productId);

	if (!product) {
		return;
	}

	return new ImageResponse(
		(
			<div tw="relative flex w-full h-full justify-center items-center flex-col">
				{product.images[0] && (
					<img
						alt={product.images[0].fileName}
						src={product.images[0].url}
						tw="absolute w-full h-full"
					/>
				)}

				<div tw="flex flex-col w-full justify-center items-center shadow bg-black/60 p-2 text-white text-2xl">
					<h1>{product.name}</h1>
					<p>{product.categories[0]?.name}</p>
					<p>{product.description}</p>
				</div>
			</div>
		),
		{
			...size,
		},
	);
}
