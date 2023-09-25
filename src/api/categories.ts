import { executeGraphql } from "./graphqlApi";
import { CategoriesGetListDocument } from "@/gql/graphql";

export const getCategoriesList = async () => {
	const { categories } = await executeGraphql(CategoriesGetListDocument);

	return categories;
};