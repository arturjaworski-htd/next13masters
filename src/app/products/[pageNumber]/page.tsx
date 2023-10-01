import { getProductsList } from "@/api/products";
import { MAX_PRODUCTS_PER_PAGE } from "@/constants";
import { PaginationWithLink } from "@/ui/molecules/PaginationWithLink";
import { ProductList } from "@/ui/organisms/ProductList";

// export const generateStaticParams = async () => {
// 	return [...Array(2).keys()].map((page) => ({
// 		params: { pageNumber: page + 1 },
// 	}));
// };

export default async function ProductsPage({ params }: { params: { pageNumber: string } }) {
	const page = parseInt(params.pageNumber, 10) || 1;
	const { products, totalCount } = await getProductsList(page, MAX_PRODUCTS_PER_PAGE);

	if (products.length === 0) {
		return <div className="text-center">Not founds any products</div>;
	}

	return (
		<div className="flex flex-col gap-9">
			<ProductList products={products} />
			<PaginationWithLink
				href="/products"
				page={page}
				perPage={MAX_PRODUCTS_PER_PAGE}
				totalCount={totalCount}
			/>
		</div>
	);
}
