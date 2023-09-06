import { ProductList } from "@/ui/organisms/ProductList";
import { type ProductItemType } from "@/ui/types";

const products: ProductItemType[] = [
	{
		id: "1",
		name: "Bluzka",
		category: "Accessories",
		price: 2137,
		coverImage: {
			alt: "",
			src: "/products/product_1.jpg",
		},
	},
	{
		id: "2",
		name: "Czapka",
		category: "Accessories",
		price: 2137,
		coverImage: {
			alt: "",
			src: "/products/product_2.jpg",
		},
	},
	{
		id: "3",
		name: "Bluza",
		category: "Accessories",
		price: 2137,
		coverImage: {
			alt: "",
			src: "/products/product_3.jpg",
		},
	},
	{
		id: "4",
		name: "Kubek",
		category: "Accessories",
		price: 2137,
		coverImage: {
			alt: "",
			src: "/products/product_4.jpg",
		},
	},
];

export default function Home() {
	return (
		<section className="mx-auto max-w-md p-12 sm:max-w-2xl sm:py-16 md:max-w-4xl lg:max-w-7xl">
			<ProductList products={products} />
		</section>
	);
}
