import { executeGraphql } from "./graphqlApi";
import { OrdersGetByEmailDocument } from "@/gql/graphql";

export const getOrders = async (email: string) => {
	const { orders } = await executeGraphql({
		query: OrdersGetByEmailDocument,
		variables: {
			email,
		},
	});
	return orders;
};
