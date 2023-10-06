"use client";
import { useState } from "react";
import clsx from "clsx";
import { useRouter, useSearchParams } from "next/navigation";
import {
	type ProductSize,
	type ProductColor,
	type ProductColorVariantFragment,
	type ProductSizeColorVariantFragment,
} from "@/gql/graphql";

const getColor = (color: ProductColor) => {
	switch (color) {
		case "BLACK":
			return "bg-black";
		case "PINK":
			return "bg-pink-500";
		case "PURPLE":
			return "bg-purple-500";
	}
};

const groupVariants = (
	vatiantObjects: ProductSizeColorVariantFragment[] | ProductColorVariantFragment[],
) => {
	const initialAcc: { color: ProductColor; sizes: ProductSize[] }[] = [];

	return vatiantObjects.reduce((acc, variant) => {
		const existingVariant = acc.find((v) => v.color === variant.color);

		if (existingVariant && "size" in variant) {
			existingVariant.sizes.push(variant.size);
		} else if ("size" in variant) {
			acc.push({ color: variant.color, sizes: [variant.size] });
		} else {
			acc.push({ color: variant.color, sizes: [] });
		}
		return acc;
	}, initialAcc);
};

type ProductVariansProps = {
	variants: ProductSizeColorVariantFragment[] | ProductColorVariantFragment[];
	productId: string;
};

export const ProductVarians = ({ productId, variants }: ProductVariansProps) => {
	const router = useRouter();
	const searchParams = useSearchParams();
	const groupedVariants = groupVariants(variants);

	const [currentVariant, setCurrentVariant] = useState(
		groupedVariants.find((variant) => variant.color === searchParams.get("color")) ??
			groupedVariants[0],
	);
	const [currentSize, setCurrentSize] = useState(
		(currentVariant?.sizes.find((size) => size === searchParams.get("size")) ||
			currentVariant?.sizes[0]) ??
			(groupedVariants[0] && groupedVariants[0].sizes[0]),
	);

	const handleChangeColor = (variant: { color: ProductColor; sizes: ProductSize[] }) => {
		if (variant.color === currentVariant?.color) {
			return;
		}

		const params = new URLSearchParams(searchParams);

		setCurrentVariant(variant);
		params.set("color", variant.color);

		const size = variant.sizes[0];

		if (size) {
			setCurrentSize(size);
			params.set("size", size);
		}

		seQueryParams(params);
	};

	const handleChangeSize = (size: ProductSize) => {
		setCurrentSize(size);

		const params = new URLSearchParams(searchParams);
		params.set("size", size);
		seQueryParams(params);
	};

	const seQueryParams = (params: URLSearchParams) => {
		router.replace(`/product/${productId}?${params.toString()}`);
	};

	if (groupedVariants.length === 0) {
		return;
	}

	return (
		<div className="flex w-full flex-col justify-between gap-4 sm:flex-row sm:items-center sm:gap-0">
			<div className="flex gap-2">
				{groupedVariants.map((variant, idx) => (
					<div
						key={idx}
						className={clsx("h-7 w-7 cursor-pointer rounded-full", getColor(variant.color), {
							"border-4 border-blue-500 shadow-md": currentVariant?.color === variant.color,
						})}
						onClick={() => handleChangeColor(variant)}
					/>
				))}
			</div>
			<div className="flex gap-1 text-center text-sm font-medium">
				{currentVariant?.sizes.map((size, idx) => (
					<div
						key={idx}
						className={clsx("w-16 cursor-pointer rounded-md border py-1 hover:border-slate-500", {
							"bg-slate-300": currentSize === size,
						})}
						onClick={() => handleChangeSize(size)}
					>
						{size}
					</div>
				))}
			</div>
		</div>
	);
};
