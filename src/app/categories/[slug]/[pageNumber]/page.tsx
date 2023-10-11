import { type Metadata } from "next";
import { getProductsByCategorySlug } from "@/api/products";
import { MAX_PRODUCTS_PER_PAGE } from "@/constants";
import { PaginationWithLink } from "@/ui/molecules/PaginationWithLink";
import { ProductList } from "@/ui/organisms/ProductList";
import { getCategoryBySlug } from "@/api/categories";

export const generateMetadata = async ({
	params,
}: {
	params: { slug: string };
}): Promise<Metadata> => {
	const category = await getCategoryBySlug(params.slug);
	return {
		title: `${category?.name} | Next Store`,
		description: category?.description,
	};
};

export default async function CategoryPage({
	params,
}: {
	params: { slug: string; pageNumber: string };
}) {
	const { slug } = params;
	const page = parseInt(params.pageNumber, 10) || 1;
	const { products, totalCount } = await getProductsByCategorySlug(
		slug,
		page,
		MAX_PRODUCTS_PER_PAGE,
	);

	if (products.length === 0) {
		return <div className="text-center">Not founds any products</div>;
	}

	return (
		<div className="flex flex-col gap-9">
			<h1 className="text-2xl font-bold text-slate-900">{products[0]?.categories[0]?.name}</h1>

			<ProductList products={products} />
			<PaginationWithLink
				href={`/categories/${slug}`}
				page={page}
				perPage={MAX_PRODUCTS_PER_PAGE}
				totalCount={totalCount}
			/>
		</div>
	);
}
