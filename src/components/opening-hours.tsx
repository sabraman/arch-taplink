"use client";

import { motion } from "framer-motion";
import { Clock, Phone, Send } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Badge } from "~/components/ui/badge";
import { OpeningHoursSkeleton } from "~/components/ui/website-skeletons";

// Import SVG as component
const PawIcon = () => (
	<svg
		width="14"
		height="14"
		viewBox="0 0 320 320"
		fill="none"
		xmlns="http://www.w3.org/2000/svg"
		className="text-current"
	>
		<title>Декоративная лапа</title>
		<path
			d="M154.521 106.172C156.509 105.991 158.561 106.044 160.547 106.228C165.451 106.684 170.108 108.113 174.566 110.181C190.896 117.755 198.969 133.017 208.363 147.359C212.212 153.139 216.338 158.73 220.724 164.114C227.877 172.96 237.124 179.64 244.336 188.337C255.96 202.356 263.403 220.065 261.617 238.5C260.482 250.764 254.438 262.049 244.857 269.788C225.597 285.529 202.348 277.132 181.052 271.56C174.059 269.73 167.163 268.279 159.964 267.551C145.427 265.83 119.518 276.814 103.6 278.621C91.5176 279.993 79.4346 277.608 69.8366 269.9C60.1706 262.073 54.0556 250.689 52.8686 238.308C50.8736 218.73 59.9456 199.181 73.1166 185.084C77.1626 180.753 81.7276 176.921 85.9596 172.775C89.9396 168.877 93.5996 164.537 97.0266 160.149C105.938 148.742 112.507 135.662 121.711 124.546C130.011 114.522 141.375 107.407 154.521 106.172Z"
			fill="currentColor"
		/>
		<path
			d="M103.61 0.0986973C111.613 -0.725303 120.459 3.73969 126.456 8.66069C139.053 18.9977 145.962 35.7667 147.498 51.6787C148.798 65.1307 146.477 80.6677 137.561 91.3517C132.045 97.9627 125.499 101.738 116.921 102.516C108.321 102.515 101.094 100.079 94.3424 94.6387C81.5124 84.2997 74.1314 67.8517 72.4494 51.6877C70.9934 37.6877 73.4584 22.0227 82.6544 10.8797C88.0964 4.2857 95.1724 0.853697 103.61 0.0986973Z"
			fill="currentColor"
		/>
		<path
			d="M208.655 0.106982C208.693 0.102982 208.731 0.0969889 208.769 0.0949889C215.538 -0.227011 222.181 2.00699 227.382 6.35199C237.024 14.302 241.115 26.315 242.276 38.414C243.891 55.243 238.722 73.996 227.861 87.078C220.587 95.839 212.182 101.35 200.756 102.405C194.101 103.066 187.047 100.448 181.928 96.289C172.716 88.806 168.111 76.519 167.039 64.985C165.399 47.344 170.516 28.679 181.925 14.982C188.96 6.53598 197.603 1.10698 208.655 0.106982Z"
			fill="currentColor"
		/>
		<path
			d="M26.8344 80.4655C37.5434 79.4715 47.0193 83.5965 55.1443 90.3645C66.9263 100.178 74.6073 115.513 75.8773 130.737C76.7923 141.696 74.8623 153.045 67.5143 161.621C62.9103 166.994 56.5883 170.661 49.4793 171.214C39.5213 172.25 30.4633 168.758 22.5753 162.815C10.8833 154.006 2.62134 139.219 0.598343 124.78C-0.981657 113.498 0.328348 100.837 7.42235 91.5155C12.3603 85.0285 18.8454 81.5785 26.8344 80.4655Z"
			fill="currentColor"
		/>
		<path
			d="M281.73 80.4633C289.465 79.8723 296.926 81.7733 302.859 86.9053C310.21 93.2643 313.878 102.957 314.467 112.486C315.365 128.331 309.992 143.893 299.51 155.809C292.633 163.589 282.512 170.495 271.88 171.193C264.695 171.938 257.594 170.396 251.771 166.02C244.371 160.459 240.322 151.946 239.039 142.903C236.902 127.847 241.5 111.825 250.614 99.7543C258.551 89.2423 268.585 82.2543 281.73 80.4633Z"
			fill="currentColor"
		/>
	</svg>
);

// Route icon for Yandex Maps
const RouteIcon = () => (
	<svg
		width="24"
		height="24"
		viewBox="0 0 24 24"
		xmlns="http://www.w3.org/2000/svg"
	>
		<title>Маршрут</title>
		<path
			d="M6.293 5.207l3.5 3.5a1.001 1.001 0 0 0 1.665-.42l1.5-5a1 1 0 0 0-1.245-1.245l-5 1.5a1.003 1.003 0 0 0-.42 1.665z"
			fill="currentColor"
		/>
		<path
			d="M4.96 8.157c-1.708 1.501-1.952 4.168-.548 5.968 1.414 1.812 3.99 2.107 5.756.658l4.88-4.004a2.112 2.112 0 0 1 3.016.346c.749.96.617 2.4-.293 3.2l-1.043.916c-.409.36-.456.99-.106 1.41.35.42.966.468 1.375.108l1.043-.916c1.708-1.502 1.953-4.166.547-5.968-1.412-1.81-3.992-2.106-5.756-.658l-4.88 4.004a2.11 2.11 0 0 1-3.016-.346c-.747-.958-.616-2.4.293-3.2l.542-.415c.409-.36.46-.99.11-1.41a.964.964 0 0 0-1.38-.11l-.54.417z"
			fill="currentColor"
		/>
		<path d="M10 19a3 3 0 1 1 6 0 3 3 0 0 1-6 0z" fill="currentColor" />
	</svg>
);

export function OpeningHours() {
	const [isOpen, setIsOpen] = useState(false);
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		// Function to check if the store is currently open
		const checkIfOpen = () => {
			// Get current time in GMT+3
			const now = new Date();
			const moscowTime = new Date(
				now.getTime() + (3 * 60 + now.getTimezoneOffset()) * 60000,
			);

			const hours = moscowTime.getHours();
			const minutes = moscowTime.getMinutes();

			// Check if current time is between 11:00 and 22:30
			const isCurrentlyOpen =
				(hours > 11 || (hours === 11 && minutes >= 0)) &&
				(hours < 22 || (hours === 22 && minutes <= 30));

			setIsOpen(isCurrentlyOpen);
		};

		// Check initially
		checkIfOpen();
		setIsLoading(false);

		// Set up interval to check every minute
		const interval = setInterval(checkIfOpen, 60000);

		// Clean up interval
		return () => clearInterval(interval);
	}, []);

	if (isLoading) {
		return <OpeningHoursSkeleton />;
	}

	return (
		<div className="grid grid-cols-3 items-center gap-1 xs:gap-3 xxs:gap-2 px-1.5 xs:px-3 xxs:px-2 py-0.5 xs:py-1.5 xxs:py-1 sm:gap-4 sm:px-5 sm:py-2 md:gap-6 md:px-6">
			{/* Left side icons */}
			<div className="flex items-center space-x-1.5 xs:space-x-2.5 xxs:space-x-2 sm:space-x-3">
				<motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
					<Link
						href="https://t.me/arch_smoke"
						target="_blank"
						rel="noopener noreferrer"
					>
						<div className="flex h-7 xs:h-10 xxs:h-9 w-7 xs:w-10 xxs:w-9 items-center justify-center rounded-full border border-primary/20 bg-primary/10 text-primary transition-colors hover:bg-primary/20 sm:h-11 sm:w-11">
							<Send className="h-3.5 xs:h-5 xxs:h-4.5 w-3.5 xs:w-5 xxs:w-4.5 sm:h-6 sm:w-6" />
						</div>
					</Link>
				</motion.div>

				<motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
					<Link href="tel:+79856696870">
						<div className="flex h-7 xs:h-10 xxs:h-9 w-7 xs:w-10 xxs:w-9 items-center justify-center rounded-full border border-primary/20 bg-primary/10 text-primary transition-colors hover:bg-primary/20 sm:h-11 sm:w-11">
							<Phone className="h-3.5 xs:h-5 xxs:h-4.5 w-3.5 xs:w-5 xxs:w-4.5 sm:h-6 sm:w-6" />
						</div>
					</Link>
				</motion.div>
			</div>

			{/* Opening Hours Badge (Center) */}
			<motion.div
				initial={{ opacity: 0, y: -10 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.5, ease: "easeOut" }}
				className="flex items-center justify-center"
			>
				<Badge
					variant="outline"
					className={`flex min-h-8 xxs:min-h-10 items-center gap-1 xs:gap-2 xxs:gap-1.5 rounded-full border px-2 xs:px-3.5 xxs:px-3 py-1 xs:py-2 xxs:py-1.5 font-medium text-[10px] xs:text-sm xxs:text-xs shadow-sm sm:gap-2.5 sm:px-4 sm:py-2.5 sm:text-base ${
						isOpen
							? "border-primary/30 bg-primary/5 text-white"
							: "border-destructive/30 bg-destructive/5 text-white"
					}`}
				>
					{/* Status indicator */}
					<span className="flex items-center justify-center gap-0.5 xs:gap-1.5 xxs:gap-1 sm:gap-2">
						<motion.span
							className={`inline-flex h-2 xs:h-3 xxs:h-2.5 w-2 xs:w-3 xxs:w-2.5 rounded-full sm:h-3.5 sm:w-3.5 ${
								isOpen ? "bg-primary" : "bg-destructive"
							}`}
							animate={{
								scale: [1, 1.2, 1],
								opacity: [0.7, 1, 0.7],
							}}
							transition={{
								duration: 2,
								repeat: Number.POSITIVE_INFINITY,
								ease: "easeInOut",
							}}
						/>
						<span className="font-semibold">
							{isOpen ? "Открыто" : "Закрыто"}
						</span>
					</span>

					{/* Separator */}
					<span className="mx-0.5 xs:mx-1.5 xxs:mx-1 text-foreground/30 sm:mx-2">
						•
					</span>

					{/* Hours */}
					<span className="flex items-center">
						<Clock className="mr-0.5 xs:mr-1.5 xxs:mr-1 h-2.5 xs:h-4 xxs:h-3.5 w-2.5 xs:w-4 xxs:w-3.5 opacity-70 sm:mr-2 sm:h-5 sm:w-5" />
						<span>11:00–22:30</span>
					</span>

					{/* Paw icon */}
					<span className="ml-0.5 xs:ml-1.5 xxs:ml-1 text-primary/50 sm:ml-2">
						<PawIcon />
					</span>
				</Badge>
			</motion.div>

			{/* Right side icon */}
			<div className="flex items-center justify-end">
				<motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
					<Link
						href="https://yandex.ru/maps/-/CHrszN9D"
						target="_blank"
						rel="noopener noreferrer"
					>
						<div className="flex h-7 xs:h-10 xxs:h-9 w-7 xs:w-10 xxs:w-9 items-center justify-center rounded-full border border-primary/20 bg-primary/10 text-primary transition-colors hover:bg-primary/20 sm:h-11 sm:w-11">
							<RouteIcon />
						</div>
					</Link>
				</motion.div>
			</div>
		</div>
	);
}
