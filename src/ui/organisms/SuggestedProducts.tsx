import { ProductList } from "./ProductList";
import { getSuggestedProductsByCategoryName } from "@/api/products";

type SuggestedProductsListProps = {
	categoryName: string;
};

export const SuggestedProductsList = async ({ categoryName }: SuggestedProductsListProps) => {
	const products = await getSuggestedProductsByCategoryName(categoryName);

	if (products.length === 0) {
		return;
	}

	return (
		<aside className="mt-9 flex flex-col gap-6">
			<h2 className="text-xl font-bold">Related products</h2>
			<ProductList data-testid="related-products" products={products} />
		</aside>
	);
};
