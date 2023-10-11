import { Suspense } from "react";
import { getProductsList } from "@/api/products";
import { ProductList } from "@/ui/organisms/ProductList";
import { getCollectionsList } from "@/api/collections";
import { CollectionList } from "@/ui/organisms/CollectionList";

export default async function HomePage() {
	const { products } = await getProductsList(1, 4, "createdAt_ASC");
	const collections = await getCollectionsList();

	return (
		<div className="flex flex-col gap-8">
			<CollectionList collections={collections} />

			<Suspense>
				<aside className="flex flex-col gap-6">
					<ProductList products={products} />
				</aside>
			</Suspense>
		</div>
	);
}
