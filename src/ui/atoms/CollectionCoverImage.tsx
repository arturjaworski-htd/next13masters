import NextImage from "next/image";

type CollectionCoverImageProps = {
	src: string;
	alt: string;
};

export const CollectionCoverImage = ({ src, alt }: CollectionCoverImageProps) => {
	return (
		<div className="aspect-auto overflow-hidden rounded-md border bg-slate-50 hover:bg-slate-100">
			<NextImage
				width={600}
				height={320}
				alt={alt}
				src={src}
				className="h-full w-full object-cover object-center p-4 transition-transform hover:scale-105"
			/>
		</div>
	);
};
