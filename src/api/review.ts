import { executeGraphql } from "./graphqlApi";
import { ReviewCreateDocument, ReviewsGetByProductIdDocument, type Stage } from "@/gql/graphql";

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

export const addReview = async ({
	productId,
	name,
	email,
	headline,
	content,
	rating,
}: {
	productId: string;
	name: string;
	email: string;
	headline: string;
	content: string;
	rating: number;
}) => {
	await executeGraphql({
		query: ReviewCreateDocument,
		variables: {
			productId,
			name,
			email,
			headline,
			content,
			rating,
		},
	});
};
