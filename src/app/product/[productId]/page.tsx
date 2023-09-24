import { type Metadata } from "next";
import { notFound } from "next/navigation";
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
		<article className="flex justify-center gap-8">
			{product.images[0] && <ProductImage src={product.images[0].url} alt="" />}
			<ProductDescription product={product} />
		</article>
	);
}
