"use client";

import { Skeleton } from "~/components/ui/skeleton";

// Opening Hours Skeleton
export function OpeningHoursSkeleton() {
	return (
		<div className="grid grid-cols-3 items-center gap-1 xxs:gap-2 xs:gap-3 sm:gap-4 md:gap-6 px-1.5 xxs:px-2 xs:px-3 sm:px-5 md:px-6 py-0.5 xxs:py-1 xs:py-1.5 sm:py-2">
			{/* Left side icons */}
			<div className="flex items-center space-x-1.5 xxs:space-x-2 xs:space-x-2.5 sm:space-x-3">
				<Skeleton className="h-7 w-7 xxs:h-9 xxs:w-9 xs:h-10 xs:w-10 sm:h-11 sm:w-11 rounded-full" />
				<Skeleton className="h-7 w-7 xxs:h-9 xxs:w-9 xs:h-10 xs:w-10 sm:h-11 sm:w-11 rounded-full" />
			</div>

			{/* Center badge */}
			<div className="flex items-center justify-center">
				<Skeleton className="h-8 xxs:h-10 w-32 xxs:w-40 xs:w-48 sm:w-56 rounded-full" />
			</div>

			{/* Right side icon */}
			<div className="flex items-center justify-end">
				<Skeleton className="h-7 w-7 xxs:h-9 xxs:w-9 xs:h-10 xs:w-10 sm:h-11 sm:w-11 rounded-full" />
			</div>
		</div>
	);
}

// About Us Section Skeleton
export function AboutUsSkeleton() {
	return (
		<section className="relative mx-auto w-full max-w-4xl overflow-hidden px-6 py-16 md:py-20">
			{/* Background decoration placeholders */}
			<div className="absolute top-10 left-8 opacity-10">
				<Skeleton className="h-20 w-20 rounded-full" />
			</div>
			<div className="absolute top-32 right-12 opacity-10">
				<Skeleton className="h-16 w-16 rounded-full" />
			</div>
			<div className="absolute bottom-20 left-16 opacity-10">
				<Skeleton className="h-12 w-12 rounded-full" />
			</div>

			{/* Main content */}
			<div className="relative z-10 mx-auto max-w-3xl text-center">
				<div className="mb-8">
					{/* Title skeleton */}
					<Skeleton className="h-8 w-64 mx-auto mb-4" />
					
					{/* Paragraphs */}
					<div className="space-y-4 text-left">
						<Skeleton className="h-4 w-full" />
						<Skeleton className="h-4 w-11/12" />
						<Skeleton className="h-4 w-10/12" />
						<Skeleton className="h-4 w-9/12 mb-6" />
						
						{/* List items */}
						<div className="space-y-2 ml-6">
							<div className="flex items-center space-x-3">
								<Skeleton className="h-2 w-2 rounded-full" />
								<Skeleton className="h-4 w-3/4" />
							</div>
							<div className="flex items-center space-x-3">
								<Skeleton className="h-2 w-2 rounded-full" />
								<Skeleton className="h-4 w-2/3" />
							</div>
							<div className="flex items-center space-x-3">
								<Skeleton className="h-2 w-2 rounded-full" />
								<Skeleton className="h-4 w-4/5" />
							</div>
						</div>
						
						{/* Final paragraph */}
						<div className="space-y-2 mt-6">
							<Skeleton className="h-4 w-full" />
							<Skeleton className="h-4 w-5/6" />
						</div>
						
						{/* Small text */}
						<Skeleton className="h-3 w-3/4 mt-6" />
					</div>
				</div>
			</div>
		</section>
	);
}

// Footer Skeleton
export function FooterSkeleton() {
	return (
		<footer className="w-full bg-card/50 border-t border-primary/10">
			<div className="mx-auto max-w-6xl px-6 py-12">
				<div className="grid grid-cols-1 gap-8 md:grid-cols-3">
					{/* Contact column */}
					<div className="space-y-4">
						<Skeleton className="h-6 w-24" />
						<div className="space-y-3">
							<div className="flex items-center space-x-3">
								<Skeleton className="h-4 w-4" />
								<Skeleton className="h-4 w-32" />
							</div>
							<div className="flex items-center space-x-3">
								<Skeleton className="h-4 w-4" />
								<Skeleton className="h-4 w-40" />
							</div>
							<div className="flex items-center space-x-3">
								<Skeleton className="h-4 w-4" />
								<Skeleton className="h-4 w-28" />
							</div>
						</div>
					</div>

					{/* Hours column */}
					<div className="space-y-4">
						<Skeleton className="h-6 w-32" />
						<div className="space-y-2">
							<Skeleton className="h-4 w-28" />
							<Skeleton className="h-4 w-24" />
						</div>
					</div>

					{/* Social/Legal column */}
					<div className="space-y-4">
						<Skeleton className="h-6 w-20" />
						<div className="space-y-2">
							<Skeleton className="h-4 w-36" />
							<Skeleton className="h-4 w-32" />
						</div>
						
						{/* Social icons */}
						<div className="flex space-x-3 mt-4">
							<Skeleton className="h-8 w-8 rounded" />
							<Skeleton className="h-8 w-8 rounded" />
							<Skeleton className="h-8 w-8 rounded" />
						</div>
					</div>
				</div>

				{/* Bottom section */}
				<div className="mt-8 pt-8 border-t border-primary/10">
					<div className="flex flex-col items-center justify-between space-y-4 md:flex-row md:space-y-0">
						<div className="flex items-center space-x-3">
							<Skeleton className="h-6 w-6" />
							<Skeleton className="h-4 w-48" />
						</div>
						<Skeleton className="h-4 w-32" />
					</div>
				</div>
			</div>
		</footer>
	);
}

// Logo Section Skeleton
export function LogoSkeleton() {
	return (
		<div className="mx-auto flex w-full max-w-4xl justify-center px-6 pt-20 xs:pt-22 sm:pt-24 md:pt-28 lg:pt-32 pb-8 xs:pb-10 sm:pb-12 md:pb-16">
			<Skeleton className="h-24 w-72 md:h-32 md:w-96" />
		</div>
	);
}

// Full Page Loading Skeleton
export function PageSkeleton() {
	return (
		<div className="min-h-screen bg-background">
			{/* Fixed header skeleton */}
			<div className="fixed top-0 z-50 w-full border-primary/10 border-b bg-background/80 shadow-sm backdrop-blur-lg">
				<div className="mx-auto w-full max-w-6xl">
					<OpeningHoursSkeleton />
				</div>
			</div>

			{/* Main content */}
			<main className="relative flex min-h-screen flex-col items-center overflow-x-hidden bg-background">
				{/* Logo skeleton */}
				<LogoSkeleton />

				{/* About section skeleton */}
				<AboutUsSkeleton />

				{/* Product catalog skeleton */}
				<div className="relative w-full bg-gradient-to-b from-transparent to-background/40 pt-6 pb-20">
					<div className="mx-auto max-w-5xl">
						<ProductCatalogSkeleton />
					</div>
				</div>
			</main>

			{/* Footer skeleton */}
			<FooterSkeleton />
		</div>
	);
}

// Product Card Skeleton (moved from enhanced-product-catalog)
export function ProductCardSkeleton() {
	return (
		<div className="space-y-3 p-4 border rounded-lg bg-card">
			<div className="flex items-center space-x-4">
				<Skeleton className="h-12 w-12 rounded-full" />
				<div className="space-y-2 flex-1">
					<Skeleton className="h-4 w-[250px]" />
					<Skeleton className="h-4 w-[200px]" />
				</div>
			</div>
			<Skeleton className="h-4 w-full" />
			<Skeleton className="h-4 w-3/4" />
		</div>
	);
}

// Product Catalog Skeleton (moved from enhanced-product-catalog)
export function ProductCatalogSkeleton() {
	return (
		<div className="mx-auto w-full max-w-5xl overflow-hidden px-4 py-12 space-y-8">
			{/* Title and search skeleton */}
			<div className="flex flex-col items-center space-y-6">
				<Skeleton className="h-8 w-48" />
				<Skeleton className="h-10 w-full max-w-md rounded-md" />
			</div>

			{/* Accordion items skeleton */}
			<div className="space-y-4">
				{Array.from({ length: 6 }).map((_, i) => (
					<div key={i} className="border rounded-lg">
						<div className="flex items-center justify-between p-4">
							<div className="flex items-center space-x-3">
								<Skeleton className="h-6 w-6 rounded" />
								<Skeleton className="h-5 w-40" />
							</div>
							<Skeleton className="h-5 w-5 rounded" />
						</div>
						<div className="px-4 pb-4 space-y-3">
							<ProductCardSkeleton />
							<ProductCardSkeleton />
							<ProductCardSkeleton />
						</div>
					</div>
				))}
			</div>
		</div>
	);
}