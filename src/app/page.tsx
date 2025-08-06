"use client";

import dynamic from "next/dynamic";
import Image from "next/image";
import { OpeningHours } from "~/components/opening-hours";

// Lazy load components below the fold for better performance
const AboutUs = dynamic(
	() =>
		import("~/components/about-us").then((mod) => ({ default: mod.AboutUs })),
	{
		loading: () => (
			<div className="h-32 animate-pulse rounded-lg bg-muted/20" />
		),
	},
);

const EnhancedProductCatalog = dynamic(
	() =>
		import("~/components/enhanced-product-catalog").then((mod) => ({
			default: mod.EnhancedProductCatalog,
		})),
	{
		loading: () => (
			<div className="h-96 animate-pulse rounded-lg bg-muted/20" />
		),
	},
);

const Footer = dynamic(
	() => import("~/components/footer").then((mod) => ({ default: mod.Footer })),
	{
		loading: () => <div className="h-64 animate-pulse bg-muted/20" />,
	},
);

const ScrollProgressBar = dynamic(
	() =>
		import("~/components/scroll-progress-bar").then((mod) => ({
			default: mod.ScrollProgressBar,
		})),
	{
		ssr: false,
	},
);

const SmoothScroll = dynamic(
	() =>
		import("~/components/smooth-scroll").then((mod) => ({
			default: mod.SmoothScroll,
		})),
	{
		ssr: false,
		loading: () => <div className="min-h-screen" />,
	},
);

function SkipLink() {
	return (
		<a href="#main-content" className="skip-link">
			Перейти к основному содержанию
		</a>
	);
}

export default function HomePage() {
	return (
		<>
			<SkipLink />
			<ScrollProgressBar />
			<SmoothScroll>
				<main
					id="main-content"
					className="relative flex min-h-screen flex-col items-center overflow-x-hidden bg-background"
				>
					{/* Opening Hours - Fixed at the top */}
					<div className="fixed top-0 z-50 w-full border-primary/10 border-b bg-background/80 shadow-sm backdrop-blur-lg">
						<div className="mx-auto w-full max-w-6xl">
							<OpeningHours />
						</div>
					</div>

					{/* Content Container with proper padding for fixed header */}
					<div className="flex w-full flex-grow flex-col items-center">
						{/* Logo Section - Optimized for LCP */}
						<div className="mx-auto flex w-full max-w-4xl justify-center px-6 pt-20 xs:pt-22 pb-8 xs:pb-10 sm:pt-24 sm:pb-12 md:pt-28 md:pb-16 lg:pt-32">
							<Image
								src="/arch-logo.svg"
								alt="ARCH Лого"
								width={500}
								height={183}
								priority
								fetchPriority="high"
								className="h-auto w-full max-w-md drop-shadow-xl filter"
								style={{
									color: "transparent",
									height: "auto",
								}}
							/>
						</div>

						{/* About Us Section */}
						<AboutUs />

						{/* Product Catalog with Enhanced Layout */}
						<div className="relative w-full bg-gradient-to-b from-transparent to-background/40 pt-6 pb-20">
							{/* Background decorative dots */}
							<div className="absolute top-20 left-6 opacity-10 md:left-20">
								<svg
									width="30"
									height="30"
									viewBox="0 0 30 30"
									fill="none"
									xmlns="http://www.w3.org/2000/svg"
									aria-hidden="true"
									role="img"
								>
									<circle
										cx="2"
										cy="2"
										r="2"
										fill="currentColor"
										className="text-primary"
									/>
									<circle
										cx="2"
										cy="15"
										r="2"
										fill="currentColor"
										className="text-primary"
									/>
									<circle
										cx="2"
										cy="28"
										r="2"
										fill="currentColor"
										className="text-primary"
									/>
									<circle
										cx="15"
										cy="2"
										r="2"
										fill="currentColor"
										className="text-primary"
									/>
									<circle
										cx="15"
										cy="15"
										r="2"
										fill="currentColor"
										className="text-primary"
									/>
									<circle
										cx="15"
										cy="28"
										r="2"
										fill="currentColor"
										className="text-primary"
									/>
									<circle
										cx="28"
										cy="2"
										r="2"
										fill="currentColor"
										className="text-primary"
									/>
									<circle
										cx="28"
										cy="15"
										r="2"
										fill="currentColor"
										className="text-primary"
									/>
									<circle
										cx="28"
										cy="28"
										r="2"
										fill="currentColor"
										className="text-primary"
									/>
								</svg>
							</div>
							<div className="absolute right-6 bottom-20 opacity-10 md:right-20">
								<svg
									width="30"
									height="30"
									viewBox="0 0 30 30"
									fill="none"
									xmlns="http://www.w3.org/2000/svg"
									aria-hidden="true"
									role="img"
								>
									<circle
										cx="2"
										cy="2"
										r="2"
										fill="currentColor"
										className="text-primary"
									/>
									<circle
										cx="2"
										cy="15"
										r="2"
										fill="currentColor"
										className="text-primary"
									/>
									<circle
										cx="2"
										cy="28"
										r="2"
										fill="currentColor"
										className="text-primary"
									/>
									<circle
										cx="15"
										cy="2"
										r="2"
										fill="currentColor"
										className="text-primary"
									/>
									<circle
										cx="15"
										cy="15"
										r="2"
										fill="currentColor"
										className="text-primary"
									/>
									<circle
										cx="15"
										cy="28"
										r="2"
										fill="currentColor"
										className="text-primary"
									/>
									<circle
										cx="28"
										cy="2"
										r="2"
										fill="currentColor"
										className="text-primary"
									/>
									<circle
										cx="28"
										cy="15"
										r="2"
										fill="currentColor"
										className="text-primary"
									/>
									<circle
										cx="28"
										cy="28"
										r="2"
										fill="currentColor"
										className="text-primary"
									/>
								</svg>
							</div>

							<div className="mx-auto max-w-5xl">
								<EnhancedProductCatalog />
							</div>
						</div>
					</div>

					{/* Modern Footer with Enhanced Design */}
					<Footer />
				</main>
			</SmoothScroll>
		</>
	);
}
