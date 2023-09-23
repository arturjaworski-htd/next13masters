import Image from "next/image";

type ProductImageProps = {
	src: string;
	alt: string;
};

export const ProductImage = ({ src, alt }: ProductImageProps) => {
	return (
		<div className="overflow-hidden rounded-md border bg-slate-50 hover:bg-slate-100">
			<Image
				width={320}
				height={600}
				alt={alt}
				src={src}
				className="h-full w-full object-cover object-center p-4 transition-transform hover:scale-105"
			/>
		</div>
	);
};
