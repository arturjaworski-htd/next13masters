import { type Route } from "next";
import { ShoppingCart } from "lucide-react";
import Link from "next/link";
import { ActiveLink } from "../atoms/ActiveLink";

type NavLinkType = {
	href: Route<string>;
	label: string;
	exact?: boolean;
};
const navLinks: NavLinkType[] = [
	{ href: "/", label: "Home" },
	{ href: "/products", label: "All", exact: false },
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
					<div>
						<Link href="/cart" className="flex text-slate-500 hover:text-slate-700">
							<ShoppingCart />
							<span className="ml-2">0</span>
							<span className="sr-only">Cart</span>
						</Link>
					</div>
				</div>
			</div>
		</header>
	);
};
