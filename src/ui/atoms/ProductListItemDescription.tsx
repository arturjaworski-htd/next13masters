import { type ProductListItemFragment } from "@/gql/graphql";
import { formatMoney, formatRating } from "@/utils";

type ProductListItemDescriptionProps = {
	product: ProductListItemFragment;
};

export const ProductListItemDescription = ({
	product: { categories, name, price, averageRating },
}: ProductListItemDescriptionProps) => {
	return (
		<div className="mt-2 flex flex-col justify-between gap-1">
			<div className="flex w-full justify-between">
				<h3 className="text-sm font-semibold text-gray-700">{name}</h3>
				<p data-testid="product-price" className="text-sm font-medium text-gray-900">
					{formatMoney(price / 100)}
				</p>
			</div>
			<div className="flex w-full justify-between">
				{categories[0] && <p className="text-sm text-gray-500">{categories[0].name}</p>}
				{averageRating && (
					<p data-testid="product-rating" className="text-sm text-gray-500">
						{formatRating(averageRating)}
					</p>
				)}
			</div>
		</div>
	);
};
