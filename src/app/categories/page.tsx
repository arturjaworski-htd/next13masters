import { getCategoriesList } from "@/api/categories";
import { ActiveLink } from "@/ui/atoms/ActiveLink";

export default async function CategoriesPage() {
	const categories = await getCategoriesList();

	if (categories.length === 0) {
		return <div className="text-center">Not founds any categories</div>;
	}

	return (
		<div className="flex flex-col items-center justify-center gap-9">
			<h1>Categories</h1>
			<ul className="flex w-32 flex-col justify-end gap-6 ">
				{categories.map(({ id, name, slug }) => (
					<li key={id}>
						<ActiveLink href={`/categories/${slug}`}>{name}</ActiveLink>
					</li>
				))}
			</ul>
		</div>
	);
}
