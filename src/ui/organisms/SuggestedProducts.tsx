import { ProductListItem } from "../molecules/ProductListItem";
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
		<aside className="flex flex-col gap-6">
			<h2 className="text-xl font-bold">Related products</h2>
			<ul
				data-testid="related-products"
				className="grid grid-cols-1 gap-8 sm:grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
			>
				{products.map((product) => (
					<ProductListItem key={product.id} product={product} />
				))}
			</ul>{" "}
		</aside>
	);
};
