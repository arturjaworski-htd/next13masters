import "./globals.css";
import type { Metadata } from "next";
import { ClerkProvider } from "@clerk/nextjs";
import { Fira_Code, Fira_Sans, Montserrat } from "next/font/google";

import Link from "next/link";
import { NavBar } from "@/ui/organisms/NavBar";

const firaCode = Fira_Code({
	subsets: ["latin"],
	weight: ["300", "400", "700"],
	variable: "--font-firaCode",
	display: "swap",
});
const firaSans = Fira_Sans({
	subsets: ["latin", "latin-ext"],
	weight: ["300", "400", "700"],
	variable: "--font-firaSans",
	display: "swap",
});
const montserrat = Montserrat({
	subsets: ["latin", "latin-ext"],
	weight: "variable",
	variable: "--font-montserrat",
	display: "swap",
});

export const metadata: Metadata = {
	title: "Next 13 Masters",
	description: "Super store Next 13 Masters",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
	return (
		<ClerkProvider>
			<html
				lang="en"
				className={`${firaCode.variable} ${firaSans.variable} ${montserrat.variable}`}
			>
				<body>
					<NavBar />
					<section className="mx-auto p-12 sm:max-w-2xl sm:py-16 md:max-w-4xl lg:max-w-7xl">
						{children}
					</section>
					<footer className="flex flex-col gap-4 p-4 text-center text-sm text-gray-500">
						<div className="flex justify-center gap-4">
							<Link href={"/terms-of-service"} className="hover:text-slate-700">
								Terms of Service
							</Link>
							<Link href={"/privacy-policy"} className="hover:text-slate-700">
								Privacy Policy
							</Link>
						</div>
						<p>© {new Date().getFullYear()}</p>
					</footer>
				</body>
			</html>
		</ClerkProvider>
	);
}
