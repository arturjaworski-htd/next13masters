"use client";

import { type Route } from "next";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { type ChangeEvent } from "react";

type SortingSelectorProps = {
	options: { label: string; value: string; dataTestId?: string }[];
	selected?: string;
};

export const SortingSelector = ({ options, selected }: SortingSelectorProps) => {
	const pathname = usePathname() as Route;
	const router = useRouter();
	const searchParams = useSearchParams();

	const onSelect = (event: ChangeEvent<HTMLSelectElement>) => {
		const params = new URLSearchParams(searchParams);
		params.set("sortBy", event.target.value);

		router.replace(`${pathname}?${params.toString()}`);
	};

	return (
		<select
			value={selected}
			onChange={onSelect}
			className="w-56 cursor-pointer rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-blue-300 focus:outline-none focus:ring focus:ring-blue-200 focus:ring-opacity-50"
		>
			{options.map((opt) => (
				<option key={opt.value} value={opt.value} data-testid={opt.dataTestId}>
					{opt.label}
				</option>
			))}
		</select>
	);
};
