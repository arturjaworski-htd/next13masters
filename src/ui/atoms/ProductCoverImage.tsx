import NextImage from "next/image";

type ProductCoverImageProps = {
	src: string;
	alt: string;
	width?: number;
	height?: number;
	priority?: boolean;
};

export const ProductCoverImage = ({
	src,
	alt,
	width = 320,
	height = 320,
	priority,
}: ProductCoverImageProps) => {
	return (
		<div className="aspect-square overflow-hidden rounded-md border bg-slate-50 hover:bg-slate-100">
			<NextImage
				priority={priority}
				width={width}
				height={height}
				alt={alt}
				src={src}
				className="h-full w-full object-cover object-center p-4 transition-transform hover:scale-105"
			/>
		</div>
	);
};
