import { type ProductItemType } from "@/ui/types";
import { formatMoney } from "@/utils";

type ProductDescriptionProps = {
	product: ProductItemType;
};

export const ProductDescription = ({
	product: { category, name, price, description, rating },
}: ProductDescriptionProps) => {
	return (
		<div className="flex flex-col">
			<h1 className="text-lg font-semibold text-gray-700">{name}</h1>
			<p className="text-sm text-gray-500">
				<span className="sr-only">Category:</span> {category}
			</p>
			<p className="mt-9 text-lg font-medium text-gray-900">
				<span className="sr-only">Price:</span>Price: {formatMoney(price / 100)}
			</p>
			<div className="mt-6 flex flex-col gap-2">
				<span>Description:</span>
				<p className="text-sm text-slate-500">{description}</p>
			</div>

			<span className="mt-auto self-end text-slate-500">Rating: {rating.rate}/5</span>
		</div>
	);
};
