"use server";

import { executeGraphql } from "@/api/graphqlApi";
import { ReviewCreateDocument } from "@/gql/graphql";

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
