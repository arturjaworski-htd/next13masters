import { type Metadata } from "next";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { getProductById } from "@/api/products";
import { ProductDescription } from "@/ui/atoms/ProductDescription";
import { ProductImage } from "@/ui/atoms/ProductImage";
import { SuggestedProductsList } from "@/ui/organisms/SuggestedProducts";

// export const generateStaticParams = async () => {
// 	const products = await getProductsList();
// 	return products.map((product) => ({
// 		params: { productId: product.id },
// 	}));
// };

export const generateMetadata = async ({
	params,
}: {
	params: { productId: string };
}): Promise<Metadata> => {
	const product = await getProductById(params.productId);
	return product
		? {
				title: `${product.name} | Next Store`,
				description: product.description,
				openGraph: {
					title: `${product.name} | Next Store`,
					description: product.description,
					images: product.images[0] && [product.images[0].url],
				},
		  }
		: {};
};

export default async function SingleProductPage({ params }: { params: { productId: string } }) {
	const product = await getProductById(params.productId);

	if (!product) {
		notFound();
	}
	return (
		<>
			<article className="flex flex-col gap-8 md:flex-row">
				{product.images[0] && (
					<ProductImage src={product.images[0].url} alt={product.images[0].fileName} />
				)}
				<ProductDescription product={product} />
			</article>
			{product.categories[0] && (
				<Suspense>
					<SuggestedProductsList categoryName={product.categories[0].name} />
				</Suspense>
			)}
		</>
	);
}
