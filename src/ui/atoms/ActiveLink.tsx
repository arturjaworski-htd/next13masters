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
	const isActive = exact ? pathname === href : pathname.startsWith(href);

	return (
		<Link
			href={href}
			aria-current={isActive ? "page" : undefined}
			className={clsx(`text-blue-400 hover:text-blue-600`, className, isActive && activeClassName, {
				underline: isActive,
				"pointer-events-none text-gray-400": disabled,
			})}
			aria-disabled={disabled}
		>
			{children}
		</Link>
	);
};
