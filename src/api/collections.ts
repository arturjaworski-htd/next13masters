import { executeGraphql } from "./graphqlApi";
import { CollectionsGetListDocument } from "@/gql/graphql";

export const getCollectionsList = async () => {
	const { collections } = await executeGraphql(CollectionsGetListDocument);

	return collections;
};
