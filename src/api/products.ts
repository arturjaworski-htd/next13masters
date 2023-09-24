import { executeGraphql } from "./graphqlApi";
import {
	ProductGetByIdDocument,
	type ProductListItemFragment,
	ProductsGetByCategorySlugDocument,
	ProductsGetListDocument,
} from "@/gql/graphql";

export const getProductsList = async (page = 1, take = 20) => {
	// const offset = (page - 1) * take;
	// const params = `?take=${take}&offset=${offset}`;

	const { products } = await executeGraphql(ProductsGetListDocument);

	return products;
};

export const getProductsByCategorySlug = async (categorySlug: string) => {
	const { products } = await executeGraphql(ProductsGetByCategorySlugDocument, {
		slug: categorySlug,
	});

	return products;
};

export const getProductById = async (id: ProductListItemFragment["id"]) => {
	const { product } = await executeGraphql(ProductGetByIdDocument, { id: id });

	return product;
};
