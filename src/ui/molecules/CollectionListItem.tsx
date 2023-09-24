import Link from "next/link";
import { CollectionListItemDescription } from "../atoms/CollectionListItemDescription";
import { CollectionCoverImage } from "../atoms/CollectionCoverImage";
import { type CollectionListItemFragment } from "@/gql/graphql";

type CollectionListItemProps = {
	collection: CollectionListItemFragment;
};

export const CollectionListItem = ({ collection }: CollectionListItemProps) => {
	return (
		<li>
			<Link href={`/collections/${collection.slug}`}>
				<article>
					<CollectionCoverImage src={collection.image.url} alt={collection.image.fileName} />
					<CollectionListItemDescription collection={collection} />
				</article>
			</Link>
		</li>
	);
};
