import { type Route } from "next";
import { ShoppingCart } from "lucide-react";
import { ActiveLink } from "../atoms/ActiveLink";
import { NavSearchBar } from "../atoms/NavSearchBar";

type NavLinkType = {
	href: Route<string>;
	label: string;
	exact?: boolean;
};
const navLinks: NavLinkType[] = [
	{ href: "/", label: "Home" },
	{ href: "/products", label: "All", exact: false },
	{ href: "/categories", label: "Categories", exact: false },
	{ href: "/collections", label: "Collections", exact: false },
];

export const NavBar = () => {
	return (
		<header className="sticky top-0 z-20 border-b bg-white bg-opacity-60 backdrop-blur-lg">
			<div className="mx-auto max-w-7xl px-2 sm:px-4 lg:px-8">
				<div className="flex flex-col justify-between gap-y-4 pb-4 lg:flex-row lg:items-center lg:pb-0">
					<nav>
						<ul className="flex h-16 max-w-full space-x-8 whitespace-nowrap lg:px-8">
							{navLinks.map(({ href, label, exact }) => (
								<li key={href} className="first:pl-4 last:pr-4 lg:px-0">
									<ActiveLink href={href} exact={exact}>
										{label}
									</ActiveLink>
								</li>
							))}
						</ul>
					</nav>
					<div className="flex h-full flex-1 items-center px-2 lg:ml-6 lg:h-16 lg:justify-end">
						<NavSearchBar />
						<div className="ml-auto h-full lg:ml-4">
							<ActiveLink href="/cart">
								<ShoppingCart />
								<span className="sr-only">Cart</span>
								<span className="ml-2">0</span>
							</ActiveLink>
						</div>
					</div>
				</div>
			</div>
		</header>
	);
};
