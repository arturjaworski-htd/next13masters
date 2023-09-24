import { executeGraphql } from "./graphqlApi";
import {
	ProductGetByIdDocument,
	type ProductListItemFragment,
	ProductsGetByCategorySlugDocument,
	ProductsGetListDocument,
	ProductsGetByCollectionSlugDocument,
	ProductsGetSuggestedByCategoryNameDocument,
	ProductsGetBySearchPhraseDocument,
} from "@/gql/graphql";

export const getProductsList = async (page = 1, limit = 20) => {
	const offset = (page - 1) * limit;

	const { products, productsConnection } = await executeGraphql(ProductsGetListDocument, {
		limit,
		offset,
	});
	const { count: totalCount } = productsConnection.aggregate;

	return { products, totalCount };
};

export const getSuggestedProductsByCategoryName = async (categoryName: string) => {
	const { products } = await executeGraphql(ProductsGetSuggestedByCategoryNameDocument, {
		name: categoryName,
	});

	return products;
};

export const getProductsByCategorySlug = async (categorySlug: string, page = 1, limit = 20) => {
	const offset = (page - 1) * limit;

	const { products, productsConnection } = await executeGraphql(ProductsGetByCategorySlugDocument, {
		slug: categorySlug,
		limit,
		offset,
	});

	const { count: totalCount } = productsConnection.aggregate;

	return { products, totalCount };
};

export const getProductsByCollectionSlug = async (collectionSlug: string) => {
	const { products } = await executeGraphql(ProductsGetByCollectionSlugDocument, {
		slug: collectionSlug,
	});

	return products;
};

export const getProductsBySearchPhrase = async (search: string) => {
	const { products } = await executeGraphql(ProductsGetBySearchPhraseDocument, {
		search,
	});

	return products;
};

export const getProductById = async (id: ProductListItemFragment["id"]) => {
	const { product } = await executeGraphql(ProductGetByIdDocument, { id: id });

	return product;
};
