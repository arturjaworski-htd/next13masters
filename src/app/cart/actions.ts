"use server";

import { executeGraphql } from "@/api/graphqlApi";
import { CartRemoveItemDocument, CartChangeItemQuantityDocument } from "@/gql/graphql";

export const removeItem = (itemId: string) => {
	return executeGraphql({
		query: CartRemoveItemDocument,
		variables: {
			itemId,
		},
		cache: "no-store",
	});
};

export const changeItemQuantity = (itemId: string, quantity: number) => {
	return executeGraphql({
		query: CartChangeItemQuantityDocument,
		variables: {
			itemId,
			quantity,
		},
		cache: "no-store",
	});
};
