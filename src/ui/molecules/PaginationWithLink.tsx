import { ActiveLink } from "../atoms/ActiveLink";

type PaginationWithLinkProps = {
	page: number;
	siblings?: number;
	totalCount?: number;
};

export const PaginationWithLink = ({ page, siblings = 1 }: PaginationWithLinkProps) => {
	const isFirstPage = page === 1;

	const className =
		"rounded-2xl border px-4 py-2 text-slate-500 hover:border-blue-500 hover:text-blue-500";

	const siblingsArray = [...Array(siblings).keys()];
	const previousPages = siblingsArray
		.map((sibling) => page - sibling - 1)
		.filter((page) => page >= 1)
		.reverse();
	const nextPages = siblingsArray.map((sibling) => page + sibling + 1);

	return (
		<div className="flex items-center justify-center gap-2" aria-label="pagination">
			<ActiveLink href={`/products/${page - 1}`} disabled={isFirstPage} className={className}>
				{"<"}
			</ActiveLink>
			{[...previousPages, page, ...nextPages].map((pageNumber) => (
				<ActiveLink href={`/products/${pageNumber}`} key={pageNumber} className={className}>
					{pageNumber}
				</ActiveLink>
			))}
			<ActiveLink href={`/products/${page + 1}`} exact={false} className={className}>
				{">"}
			</ActiveLink>
		</div>
	);
};
