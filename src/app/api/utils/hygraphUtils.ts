import { verifyWebhookSignature } from "@hygraph/utils";
import { type NextRequest } from "next/server";

export const isAuthorized = async (request: NextRequest) => {
	const body: unknown = await request.json();

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
