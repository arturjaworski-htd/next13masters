import { executeGraphql } from "./graphqlApi";
import { CategoriesGetListDocument, CategoryGetBySlugDocument } from "@/gql/graphql";

export const getCategoriesList = async () => {
	const { categories } = await executeGraphql({ query: CategoriesGetListDocument });

	return categories;
};

export const getCategoryBySlug = async (slug: string) => {
	const { categories } = await executeGraphql({
		query: CategoryGetBySlugDocument,
		variables: { slug },
	});

	return categories[0];
};
