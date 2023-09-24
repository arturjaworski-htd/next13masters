// import { CheckCheck, X } from "lucide-react";
import { type ProductListItemFragment } from "@/gql/graphql";
import { formatMoney } from "@/utils";

type ProductDescriptionProps = {
	product: ProductListItemFragment;
};

export const ProductDescription = ({
	product: { name, price, description },
}: ProductDescriptionProps) => {
	return (
		<div className="flex flex-col gap-6">
			<h1 className="text-2xl font-bold text-slate-900">{name}</h1>

			<p className="text-lg font-medium text-slate-900">
				<span className="sr-only">Price:</span>
				{formatMoney(price / 100)}
			</p>

			<p className="text-sm text-slate-500">{description}</p>

			{/* <span className="flex gap-2 font-medium text-slate-600">
				{rating.count ? <CheckCheck className="text-blue-600" /> : <X className="text-red-600" />}
				{rating.count ? "In stock" : "Out of stock"}
			</span> */}

			{/* <span className="mt-auto self-end text-slate-500">Rating: {rating.rate}/5</span> */}
		</div>
	);
};
