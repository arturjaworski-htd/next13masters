import { executeGraphql } from "./graphqlApi";
import { CollectionGetBySlugDocument, CollectionsGetListDocument } from "@/gql/graphql";

export const getCollectionsList = async () => {
	const { collections } = await executeGraphql({ query: CollectionsGetListDocument });

	return collections;
};

export const getCollectionBySlug = async (slug: string) => {
	const { collections } = await executeGraphql({
		query: CollectionGetBySlugDocument,
		variables: { slug },
	});

	return collections[0];
};
