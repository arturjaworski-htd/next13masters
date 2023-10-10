import { type Route } from "next";
import { ShoppingCart } from "lucide-react";
import { SignInButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import { ActiveLink } from "../atoms/ActiveLink";
import { NavSearchBar } from "../atoms/NavSearchBar";
import { getCart } from "@/api/cart";

type NavLinkType = {
	href: Route<string>;
	label: string;
	exact?: boolean;
	auth?: boolean;
};
const navLinks: NavLinkType[] = [
	{ href: "/", label: "Home" },
	{ href: "/products", label: "All", exact: false },
	{ href: "/categories", label: "Categories", exact: false },
	{ href: "/collections", label: "Collections", exact: false },
	{ href: "/orders", label: "Orders", exact: false, auth: true },
];

export const NavBar = async () => {
	const cart = await getCart();
	const count = cart?.orderItems.length || 0;

	return (
		<header className="sticky top-0 z-20 border-b bg-white bg-opacity-60 backdrop-blur-lg">
			<div className="mx-auto max-w-7xl px-2 sm:px-4 lg:px-8">
				<div className="flex flex-col justify-between gap-y-4 pb-4 lg:flex-row lg:items-center lg:pb-0">
					<nav>
						<ul className="flex h-16 max-w-full space-x-8 whitespace-nowrap lg:px-8">
							{navLinks.map(({ href, label, exact }) => {
								return (
									<li key={href} className="first:pl-4 last:pr-4 lg:px-0">
										<ActiveLink href={href} exact={exact}>
											{label}
										</ActiveLink>
									</li>
								);
							})}
						</ul>
					</nav>
					<div className="flex h-full flex-1 items-center gap-4 px-2 lg:ml-6 lg:h-16 lg:justify-end">
						<NavSearchBar />
						<div className="h-full">
							<ActiveLink href="/cart">
								<ShoppingCart />
								<span className="sr-only">Cart</span>
								<span className="ml-2">{count}</span>
							</ActiveLink>
						</div>

						<SignedIn>
							<UserButton afterSignOutUrl="/" userProfileMode="navigation" />
						</SignedIn>
						<SignedOut>
							<SignInButton>
								<button className="whitespace-nowrap text-sm font-medium text-slate-500 hover:border-slate-300 hover:text-slate-700">
									Sign in
								</button>
							</SignInButton>
						</SignedOut>
					</div>
				</div>
			</div>
		</header>
	);
};
