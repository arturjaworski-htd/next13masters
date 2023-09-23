import { type Metadata } from "next";
import { getProductById } from "@/api/products";
import { ProductDescription } from "@/ui/atoms/ProductDescription";
import { ProductImage } from "@/ui/atoms/ProductImage";

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
	return {
		title: `${product.name} | Next Store`,
		description: product.description,
		openGraph: {
			title: `${product.name} | Next Store`,
			description: product.description,
			images: [product.coverImage.src],
		},
	};
};

export default async function SingleProductPage({ params }: { params: { productId: string } }) {
	const product = await getProductById(params.productId);
	return (
		<>
			<article className="flex justify-center gap-8">
				<ProductImage {...product.coverImage} />
				<ProductDescription product={product} />
			</article>
		</>
	);
}
