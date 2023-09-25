import { type Route } from "next";
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
	const pagesCount = Math.ceil(totalCount / perPage);

	const isFirstPage = page === 1;
	const isLastPage = page === pagesCount;
	const pages = Array.from({ length: pagesCount }, (_, i) => i + 1);

	const className =
		"rounded-2xl border px-4 py-2 text-slate-500 hover:border-blue-500 hover:text-blue-500";

	return (
		<div className="flex items-center justify-center gap-2" aria-label="pagination">
			<ActiveLink
				href={`${href}/${page - 1}` as Route}
				disabled={isFirstPage}
				className={className}
			>
				{"<"}
			</ActiveLink>
			{pages.map((page) => (
				<ActiveLink href={`${href}/${page}` as Route} key={page} className={className}>
					{page}
				</ActiveLink>
			))}
			<ActiveLink
				href={`${href}/${page + 1}` as Route}
				exact={false}
				disabled={isLastPage}
				className={className}
			>
				{">"}
			</ActiveLink>
		</div>
	);
};
