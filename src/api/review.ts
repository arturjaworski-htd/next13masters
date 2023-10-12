import { executeGraphql } from "./graphqlApi";
import {
	ReviewsGetByProductIdDocument,
	ReviewsRaitingsGetByProductIdDocument,
	type Stage,
} from "@/gql/graphql";

export const getReviewsByProductId = async (productId: string, stage: Stage = "PUBLISHED") => {
	const { reviews, reviewsConnection } = await executeGraphql({
		query: ReviewsGetByProductIdDocument,
		variables: {
			productId,
			stage,
		},
	});
	const { count: totalCount } = reviewsConnection.aggregate;

	return { reviews, totalCount };
};

export const getRaitingsByProductId = async (productId: string, stage: Stage = "PUBLISHED") => {
	const { reviews, reviewsConnection } = await executeGraphql({
		query: ReviewsRaitingsGetByProductIdDocument,
		variables: {
			productId,
			stage,
		},
	});
	const { count: totalCount } = reviewsConnection.aggregate;

	return { reviews, totalCount };
};
