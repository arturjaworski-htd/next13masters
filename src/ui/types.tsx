export type ProductItemType = {
	id: string;
	name: string;
	category: string;
	price: number;
	coverImage: {
		src: string;
		alt: string;
	};
	rating: { rate: number; count: number };
	description: string;
};
