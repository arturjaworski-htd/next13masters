"use client";

import Link from "next/link";
import clsx from "clsx";
import { usePathname } from "next/navigation";
import { type ReactNode } from "react";
import { type Route } from "next";

type ActiveLinkProps<T extends string> = {
	href: Route<T>;
	children: ReactNode;
	className?: string;
	activeClassName?: string;
	exact?: boolean;
	disabled?: boolean;
};

export const ActiveLink = <T extends string>({
	href,
	children,
	className,
	activeClassName,
	exact = true,
	disabled,
}: ActiveLinkProps<T>) => {
	const pathname = usePathname();
	const hrefPathname = href.split("?")[0];

	const isActive = exact
		? pathname === href
		: typeof hrefPathname === "string" && pathname.startsWith(hrefPathname);

	return (
		<Link
			href={href}
			aria-current={isActive ? "page" : undefined}
			className={clsx(
				className ||
					"flex h-full w-full min-w-[3rem] items-center justify-center border-b-2 px-1 pt-1 text-center text-sm font-medium text-slate-500 hover:border-slate-300 hover:text-slate-700",
				{
					"pointer-events-none text-slate-300": disabled,
					"border-transparent": !isActive,
					[activeClassName || "border-blue-500 font-semibold"]: isActive,
				},
			)}
			aria-disabled={disabled}
		>
			{children}
		</Link>
	);
};
