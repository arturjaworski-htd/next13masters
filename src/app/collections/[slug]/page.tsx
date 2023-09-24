import { getProductsByCollectionSlug } from "@/api/products";
import { ProductList } from "@/ui/organisms/ProductList";

export default async function CollectionPage({ params }: { params: { slug: string } }) {
	const products = await getProductsByCollectionSlug(params.slug);

	if (products.length === 0) {
		return <div className="text-center">Not founds any products</div>;
	}

	return (
		<div className="flex flex-col gap-9">
			<ProductList products={products} />
		</div>
	);
}
