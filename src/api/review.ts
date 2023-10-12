import { executeGraphql } from "./graphqlApi";
import {
	ReviewsGetByProductIdDocument,
	ReviewsRaitingsGetByProductIdDocument,
} from "@/gql/graphql";

export const getReviewsByProductId = async (productId: string) => {
	const { reviews, reviewsConnection } = await executeGraphql({
		query: ReviewsGetByProductIdDocument,
		variables: {
			productId,
		},
	});
	const { count: totalCount } = reviewsConnection.aggregate;

	return { reviews, totalCount };
};

export const getRaitingsByProductId = async (productId: string) => {
	const { reviews, reviewsConnection } = await executeGraphql({
		query: ReviewsRaitingsGetByProductIdDocument,
		variables: {
			productId,
		},
	});
	const { count: totalCount } = reviewsConnection.aggregate;

	return { reviews, totalCount };
};
