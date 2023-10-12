import { verifyWebhookSignature } from "@hygraph/utils";
import { type NextRequest } from "next/server";

export const isAuthorized = async (body: unknown, request: NextRequest) => {
	const signature = request.headers.get("gcms-signature");
	const secret = process.env.GRAPHQL_WEBHOOK_SECRET;

	if (!signature || !secret) {
		return false;
	}

	const isValid = verifyWebhookSignature({ body: body, signature, secret });

	if (!isValid) {
		return false;
	}

	return true;
};
