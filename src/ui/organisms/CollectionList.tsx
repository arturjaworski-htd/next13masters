import { CollectionListItem } from "../molecules/CollectionListItem";
import { type CollectionListItemFragment } from "@/gql/graphql";

export const CollectionList = ({ collections }: { collections: CollectionListItemFragment[] }) => {
	return (
		<ul className="grid grid-cols-1 gap-8 sm:grid md:grid-cols-2 lg:grid-cols-3">
			{collections.map((collection) => (
				<CollectionListItem key={collection.id} collection={collection} />
			))}
		</ul>
	);
};
