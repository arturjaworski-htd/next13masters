import { getCollectionsList } from "@/api/collections";
import { CollectionList } from "@/ui/organisms/CollectionList";

export default async function CollectionsPage() {
	const collections = await getCollectionsList();

	if (collections.length === 0) {
		return <div className="text-center">Not founds any collections</div>;
	}

	return (
		<div className="flex flex-col gap-9">
			<CollectionList collections={collections} />
		</div>
	);
}
