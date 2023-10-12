import { getProductsList } from "@/api/products";
import { MAX_PRODUCTS_PER_PAGE } from "@/constants";
import { type ProductOrderByInput } from "@/gql/graphql";
import { PaginationWithLink } from "@/ui/molecules/PaginationWithLink";
import { ProductList } from "@/ui/organisms/ProductList";
import { SortingSelector } from "@/ui/atoms/SortingSelector";

type SortingOption = {
	label: string;
	value: ProductOrderByInput;
	dataTestId?: string;
};

const sortingOptions: Array<SortingOption> = [
	{
		label: "Rating (High to Low)",
		value: "averageRating_DESC",
		dataTestId: "sort-by-rating",
	},
	{
		label: "Riting (Low to High)",
		value: "averageRating_ASC",
		dataTestId: "sort-by-rating",
	},
	{
		label: "Name (A-Z)",
		value: "name_ASC",
	},
	{
		label: "Name (Z-A)",
		value: "name_DESC",
	},
	{
		label: "Price (Low to High)",
		value: "price_ASC",
		dataTestId: "sort-by-price",
	},
	{
		label: "Price (High to Low)",
		value: "price_DESC",
		dataTestId: "sort-by-price",
	},
];

export default async function ProductsPage({
	params,
	searchParams,
}: {
	params: { pageNumber: string };
	searchParams: { [key: string]: string };
}) {
	const sortBy =
		sortingOptions.find((opt) => opt.value === searchParams["sortBy"])?.value ||
		sortingOptions[0]?.value;

	const page = parseInt(params.pageNumber, 10) || 1;

	const { products, totalCount } = await getProductsList(page, MAX_PRODUCTS_PER_PAGE, sortBy);

	if (products.length === 0) {
		return <div className="text-center">Not founds any products</div>;
	}

	return (
		<div className="flex flex-col gap-9">
			<div className="flex justify-end">
				<SortingSelector options={sortingOptions} selected={sortBy} />
			</div>
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
