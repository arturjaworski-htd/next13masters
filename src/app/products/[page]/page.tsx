import { getProductsList } from "@/api/products";
import { PaginationWithLink } from "@/ui/molecules/PaginationWithLink";
import { ProductList } from "@/ui/organisms/ProductList";

export const generateStaticParams = async () => {
	return [...Array(20).keys()].map((page) => ({
		params: { page: page + 1 },
	}));
};

export default async function ProductsPage({ params }: { params: { page: string } }) {
	const page = parseInt(params.page, 10) || 1;
	const products = await getProductsList(page);

	if (products.length === 0) {
		return <div className="text-center">Not founds any products</div>;
	}

	return (
		<div className="flex flex-col gap-9">
			<ProductList products={products} />
			<PaginationWithLink page={page} />
		</div>
	);
}
