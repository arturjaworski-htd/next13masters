import { executeGraphql } from "./graphqlApi";
import {
	ProductGetByIdDocument,
	type ProductListItemFragment,
	ProductsGetByCategorySlugDocument,
	ProductsGetListDocument,
	ProductsGetByCollectionSlugDocument,
	ProductsGetSuggestedByCategoryNameDocument,
	ProductsGetBySearchPhraseDocument,
	type ProductOrderByInput,
	ProductChangeAverageRatingDocument,
} from "@/gql/graphql";

export const getProductsList = async (page = 1, limit = 20, orderBy?: ProductOrderByInput) => {
	const offset = (page - 1) * limit;

	const { products, productsConnection } = await executeGraphql({
		query: ProductsGetListDocument,
		variables: {
			limit,
			offset,
			orderBy,
		},
		next: {
			revalidate: 15,
		},
	});
	const { count: totalCount } = productsConnection.aggregate;

	return { products, totalCount };
};

export const getSuggestedProductsByCategoryName = async (categoryName: string) => {
	const { products } = await executeGraphql({
		query: ProductsGetSuggestedByCategoryNameDocument,
		variables: {
			name: categoryName,
		},
	});

	return products;
};

export const getProductsByCategorySlug = async (categorySlug: string, page = 1, limit = 20) => {
	const offset = (page - 1) * limit;

	const { products, productsConnection } = await executeGraphql({
		query: ProductsGetByCategorySlugDocument,
		variables: {
			slug: categorySlug,
			limit,
			offset,
		},
	});

	const { count: totalCount } = productsConnection.aggregate;

	return { products, totalCount };
};

export const getProductsByCollectionSlug = async (collectionSlug: string) => {
	const { products } = await executeGraphql({
		query: ProductsGetByCollectionSlugDocument,
		variables: {
			slug: collectionSlug,
		},
	});

	return products;
};

export const getProductsBySearchPhrase = async (search: string) => {
	const { products } = await executeGraphql({
		query: ProductsGetBySearchPhraseDocument,
		variables: {
			search,
		},
	});

	return products;
};

export const getProductById = async (id: ProductListItemFragment["id"]) => {
	const { product } = await executeGraphql({
		query: ProductGetByIdDocument,
		variables: { id: id },
	});

	return product;
};

export const changeAverageRating = async (id: string, averageRating: number) => {
	const { updateProduct } = await executeGraphql({
		query: ProductChangeAverageRatingDocument,
		variables: {
			id,
			averageRating,
		},
	});
	return updateProduct;
};
