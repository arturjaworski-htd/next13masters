import clsx from "clsx";
import { type ReviewListItemFragment } from "@/gql/graphql";
import { formatDate, formatRating } from "@/utils";

export const ReviewListItem = ({
	review,
	draft,
}: {
	review: ReviewListItemFragment;
	draft?: boolean;
}) => {
	return (
		<li className={clsx("flex flex-col gap-2 border-b py-4", { "opacity-50": draft })}>
			<div className="flex items-center justify-between">
				<div className="flex flex-col gap-2">
					<h3 className="text-lg font-medium">{review.name}</h3>
					<span className="text-sm text-slate-500">{formatRating(review.rating)}</span>
				</div>
				<span className="text-sm text-slate-500">
					{formatDate(new Date(review.createdAt as Date))}
				</span>
			</div>

			<span className="font-medium text-slate-600">{review.headline}</span>
			{draft && (
				<p className="text-sm uppercase text-red-700">
					This comment is awaiting moderation - It is visible only to you
				</p>
			)}
			<p className="mt-2 text-sm text-slate-500">{review.content}</p>
		</li>
	);
};
