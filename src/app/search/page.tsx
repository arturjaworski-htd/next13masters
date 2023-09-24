import { getProductsBySearchPhrase } from "@/api/products";
import { ProductList } from "@/ui/organisms/ProductList";

export default async function SearchPage({ searchParams }: { searchParams: { query: string } }) {
	const { query } = searchParams;
	const products = await getProductsBySearchPhrase(query);

	return (
		<div className="flex flex-col gap-6">
			<h2>
				Found {products.length} items for phrase {`"${query}"`}
			</h2>
			<div className="flex flex-col gap-9">
				<ProductList products={products} />
			</div>
		</div>
	);
}
