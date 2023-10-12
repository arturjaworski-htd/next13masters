"use client";
import { type Route } from "next";
import { useSearchParams } from "next/navigation";
import { ActiveLink } from "../atoms/ActiveLink";

type PaginationWithLinkProps<T extends string> = {
	href: Route<T>;
	page: number;
	perPage: number;
	totalCount: number;
};

export const PaginationWithLink = <T extends string>({
	href,
	page,
	perPage,
	totalCount,
}: PaginationWithLinkProps<T>) => {
	const searchParams = useSearchParams();
	const pagesCount = Math.ceil(totalCount / perPage);

	const isFirstPage = page === 1;
	const isLastPage = page === pagesCount;
	const pages = Array.from({ length: pagesCount }, (_, i) => i + 1);

	const getRoute = (pageNumber: number) => {
		const params = new URLSearchParams(searchParams).toString();
		const path = `${href}/${pageNumber}`;
		return (params ? `${path}?${params}` : path) as Route;
	};

	const className =
		"rounded-2xl border px-4 py-2 text-slate-500 hover:border-blue-500 hover:text-blue-500";

	return (
		<div className="flex items-center justify-center gap-2" aria-label="pagination">
			<ActiveLink href={getRoute(page - 1)} disabled={isFirstPage} className={className}>
				{"<"}
			</ActiveLink>
			{pages.map((page) => (
				<ActiveLink href={getRoute(page)} exact={false} key={page} className={className}>
					{page}
				</ActiveLink>
			))}
			<ActiveLink href={getRoute(page + 1)} disabled={isLastPage} className={className}>
				{">"}
			</ActiveLink>
		</div>
	);
};
