"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const HomeIcon = ({ className = "" }: { className?: string }) => (
	<svg
		xmlns="http://www.w3.org/2000/svg"
		viewBox="0 0 24 24"
		fill="none"
		stroke="currentColor"
		strokeWidth={2}
		strokeLinecap="round"
		strokeLinejoin="round"
		className={className}
		aria-hidden="true"
	>
		<path d="M3 10.5 12 3l9 7.5" />
		<path d="M5 9.5V20a1 1 0 0 0 1 1h4v-6h4v6h4a1 1 0 0 0 1-1V9.5" />
	</svg>
);

const ProfileIcon = ({ className = "" }: { className?: string }) => (
	<svg
		xmlns="http://www.w3.org/2000/svg"
		viewBox="0 0 24 24"
		fill="none"
		stroke="currentColor"
		strokeWidth={2}
		strokeLinecap="round"
		strokeLinejoin="round"
		className={className}
		aria-hidden="true"
	>
		<circle cx="12" cy="8" r="4" />
		<path d="M4 21a8 8 0 0 1 16 0" />
	</svg>
);

const items = [
	{ href: "/", label: "Home", Icon: HomeIcon },
	{ href: "/profile", label: "Profile", Icon: ProfileIcon },
] as const;

export default function Nav() {
	const pathname = usePathname();

	const selectedIndex = Math.max(
		0,
		items.findIndex(({ href }) =>
			href === "/" ? pathname === "/" : pathname.startsWith(href)
		)
	);

	return (
		<nav
			aria-label="Main navigation"
			className="fixed left-1/2 top-5 z-[1000] -translate-x-1/2 rounded-full border border-white/30 bg-white/10 p-2 shadow-[0_8px_32px_rgba(0,0,0,0.25),inset_0_1px_0_rgba(255,255,255,0.4)] backdrop-blur-xl backdrop-saturate-150"
		>
			<div className="relative isolate flex h-12 w-36">
				{/* Sliding glass bubble */}
				<span
					aria-hidden="true"
					style={{ transform: `translateX(${selectedIndex * 100}%)` }}
					className="absolute left-0 top-0 -z-10 h-full w-1/2 rounded-full border border-white/50 bg-white/30 shadow-[0_4px_16px_rgba(0,0,0,0.15),inset_0_1px_0_rgba(255,255,255,0.6)] backdrop-blur-md transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none"
				/>

				{items.map(({ href, label, Icon }, i) => {
					const isSelected = i === selectedIndex;
					return (
						<Link
							key={href}
							href={href}
							aria-label={label}
							aria-current={isSelected ? "page" : undefined}
							className={`flex flex-1 items-center justify-center rounded-full transition-colors duration-200 motion-reduce:transition-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-400 ${
								isSelected
									? "text-white"
									: "text-white/60 hover:text-white/90"
							}`}
						>
							<Icon className="h-5 w-5" />
						</Link>
					);
				})}
			</div>
		</nav>
	);
}