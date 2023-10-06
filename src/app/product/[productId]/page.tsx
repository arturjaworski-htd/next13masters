import { notFound } from "next/navigation";
import { Suspense } from "react";
import { type Metadata } from "next";
import { getProductById } from "@/api/products";
import { ProductDescription } from "@/ui/atoms/ProductDescription";
import { SuggestedProductsList } from "@/ui/organisms/SuggestedProducts";
import { ReviewSection } from "@/ui/organisms/ReviewSection";
import { ProductCoverImage } from "@/ui/atoms/ProductCoverImage";

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
		<div className="flex flex-col gap-8">
			<article className="flex flex-col gap-8 md:flex-row">
				{product.images[0] && (
					<ProductCoverImage
						src={product.images[0].url}
						alt={product.images[0].fileName}
						priority
					/>
				)}
				<ProductDescription product={product} />
			</article>
			{product.categories[0] && (
				<Suspense>
					<SuggestedProductsList categoryName={product.categories[0].name} />
				</Suspense>
			)}
			<Suspense>
				<ReviewSection productId={product.id} />
			</Suspense>
		</div>
	);
}
