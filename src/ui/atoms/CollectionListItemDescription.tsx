import { type CollectionListItemFragment } from "@/gql/graphql";

type CollectionListItemDescriptionProps = {
	collection: CollectionListItemFragment;
};

export const CollectionListItemDescription = ({
	collection: { name, description },
}: CollectionListItemDescriptionProps) => {
	return (
		<div className="mt-2 flex flex-col gap-2">
			<h3 className="text-sm font-semibold text-gray-700">{name}</h3>

			{description && (
				<p className="text-sm font-medium text-gray-900">
					<span className="sr-only">Description: </span> {description}
				</p>
			)}
		</div>
	);
};
