import { type ProductItemType } from "@/ui/types";

type ProductResponseItem = {
	id: string;
	title: string;
	price: number;
	description: string;
	category: string;
	rating: {
		rate: number;
		count: number;
	};
	image: string;
	longDescription: string;
};

export const getProductsList = async (page = 1, take = 20) => {
	const offset = (page - 1) * take;
	const params = `?take=${take}&offset=${offset}`;

	const res = await fetch(`https://naszsklep-api.vercel.app/api/products${params}`);

	const productsResponse = (await res.json()) as ProductResponseItem[];

	const products = productsResponse.map(productResponseItemToProductItemType);
	return products;
};

export const getProductById = async (id: ProductResponseItem["id"]) => {
	const res = await fetch(`https://naszsklep-api.vercel.app/api/products/${id}`);

	const productResponse = (await res.json()) as ProductResponseItem;
	return productResponseItemToProductItemType(productResponse);
};

const productResponseItemToProductItemType = (product: ProductResponseItem): ProductItemType => {
	return {
		id: product.id,
		name: product.title,
		category: product.category,
		price: product.price,
		coverImage: {
			alt: product.title,
			src: product.image,
		},
		rating: {
			rate: product.rating.rate,
			count: product.rating.count,
		},
		description: product.description,
	};
};
