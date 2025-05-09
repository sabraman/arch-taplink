import Image from "next/image";
import { AboutUs } from "~/components/about-us";
import { Footer } from "~/components/footer";
import { OpeningHours } from "~/components/opening-hours";
import { ProductCatalog } from "~/components/product-catalog";
import { ScrollProgressBar } from "~/components/scroll-progress-bar";
import { SmoothScroll } from "~/components/smooth-scroll";

export default function HomePage() {
	return (
		<>
			<ScrollProgressBar />
			<SmoothScroll>
				<main className="relative flex min-h-screen flex-col items-center overflow-x-hidden bg-background">
					{/* Opening Hours - Fixed at the top */}
					<div className="fixed top-0 z-50 w-full border-primary/10 border-b bg-background/80 shadow-sm backdrop-blur-lg">
						<div className="mx-auto w-full max-w-6xl">
							<OpeningHours />
						</div>
					</div>

					{/* Content Container with proper padding for fixed header */}
					<div className="flex w-full flex-grow flex-col items-center">
						{/* Logo Section */}
						<div className="mx-auto flex w-full max-w-4xl justify-center px-6 pt-20 xs:pt-22 sm:pt-24 md:pt-28 lg:pt-32 pb-8 xs:pb-10 sm:pb-12 md:pb-16">
							<Image
								src="/arch-logo.svg"
								alt="ARCH Лого"
								width={500}
								height={183}
								priority
								className="h-auto w-full max-w-md drop-shadow-xl filter"
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
								<ProductCatalog />
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
