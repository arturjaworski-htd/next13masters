import Link from "next/link";
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

					<div className="mt-2 flex flex-col gap-2">
						<h3 className="text-sm font-semibold text-gray-700">{collection.name}</h3>
					</div>
				</article>
			</Link>
		</li>
	);
};
