import { executeGraphql } from "./graphqlApi";
import { CollectionsGetListDocument } from "@/gql/graphql";

export const getCollectionsList = async () => {
	const { collections } = await executeGraphql({ query: CollectionsGetListDocument });

	return collections;
};
