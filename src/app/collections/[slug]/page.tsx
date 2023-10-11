import { type Metadata } from "next";
import { getProductsByCollectionSlug } from "@/api/products";
import { ProductList } from "@/ui/organisms/ProductList";
import { getCollectionBySlug } from "@/api/collections";

export const generateMetadata = async ({
	params,
}: {
	params: { slug: string };
}): Promise<Metadata> => {
	const collection = await getCollectionBySlug(params.slug);
	return {
		title: `${collection?.name} | Next Store`,
		description: collection?.description,
	};
};

export default async function CollectionPage({ params }: { params: { slug: string } }) {
	const products = await getProductsByCollectionSlug(params.slug);

	if (products.length === 0) {
		return <div className="text-center">Not founds any products</div>;
	}

	return (
		<div className="flex flex-col gap-9">
			<div>
				<h1 className="text-2xl font-bold text-slate-900">{products[0]?.collections[0]?.name}</h1>
				<p>{products[0]?.collections[0]?.description}</p>
			</div>

			<ProductList products={products} />
		</div>
	);
}
