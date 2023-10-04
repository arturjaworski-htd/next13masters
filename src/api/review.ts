import { executeGraphql } from "./graphqlApi";
import { ReviewsGetByProductIdDocument, type Stage } from "@/gql/graphql";

export const getReviewsByProductId = async (productId: string, stage: Stage = "PUBLISHED") => {
	const { reviews } = await executeGraphql({
		query: ReviewsGetByProductIdDocument,
		variables: {
			productId,
			stage,
		},
	});

	return reviews;
};
