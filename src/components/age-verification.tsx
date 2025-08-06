"use client";

import { motion } from "framer-motion";
import { X } from "lucide-react";
import { useEffect } from "react";
import {
	Dialog,
	DialogClose,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
} from "~/components/ui/dialog";
import { useAgeVerificationStore } from "~/lib/store/age-verification-store";

// Import SVG as component
const PawIcon = () => (
	<svg
		width="20"
		height="20"
		viewBox="0 0 315 279"
		fill="none"
		xmlns="http://www.w3.org/2000/svg"
		className="text-primary"
		aria-hidden="true"
	>
		<title>Декоративная иконка лапы</title>
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

// Verification duration in milliseconds (15 minutes)
const VERIFICATION_DURATION = 15 * 60 * 1000;

export function AgeVerification() {
	const { isDialogOpen, verifyAge, checkVerification } =
		useAgeVerificationStore();

	// Check verification on page load and periodically
	useEffect(() => {
		checkVerification();

		// Re-check every minute
		const interval = setInterval(checkVerification, 60 * 1000);
		return () => clearInterval(interval);
	}, [checkVerification]);

	const redirectToGoogle = () => {
		window.location.href = "https://www.google.com";
	};

	// Apply blur to the content when dialog is open
	useEffect(() => {
		if (isDialogOpen) {
			document.body.classList.add("age-verification-open");
		} else {
			document.body.classList.remove("age-verification-open");
		}

		return () => {
			document.body.classList.remove("age-verification-open");
		};
	}, [isDialogOpen]);

	return (
		<Dialog
			open={isDialogOpen}
			onOpenChange={(open) => {
				if (!open) {
					// Dialog is being closed by default action (escape, clicking outside)
					redirectToGoogle();
				}
			}}
		>
			<DialogContent
				className="z-50 border-primary/20 bg-background/95 shadow-xl backdrop-blur-lg sm:max-w-md"
				onEscapeKeyDown={redirectToGoogle}
				onInteractOutside={redirectToGoogle}
				onPointerDownOutside={redirectToGoogle}
			>
				{/* Custom close button that redirects to Google */}
				<DialogClose
					className="absolute top-4 right-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground"
					onClick={redirectToGoogle}
				>
					<X className="h-4 w-4" />
					<span className="sr-only">Закрыть</span>
				</DialogClose>

				<DialogHeader className="flex items-center gap-4">
					<div className="mx-auto flex items-center">
						<span className="mr-2 text-primary">
							<PawIcon />
						</span>
						<DialogTitle className="text-center text-xl md:text-2xl">
							Подтвердите ваш возраст
						</DialogTitle>
					</div>
					<DialogDescription className="text-center font-medium text-base md:text-lg">
						Вам исполнилось 18 лет?
					</DialogDescription>
				</DialogHeader>

				<div className="my-4 flex flex-col justify-center gap-4 sm:flex-row">
					<motion.button
						onClick={verifyAge}
						className="inline-flex items-center justify-center rounded-lg bg-gradient-to-r from-primary to-primary/80 px-8 py-3 font-medium text-white shadow-md transition-all duration-300 hover:shadow-lg"
						whileHover={{ scale: 1.03 }}
						whileTap={{ scale: 0.98 }}
					>
						<span className="relative">
							{/* Shine effect */}
							<span className="absolute inset-0 overflow-hidden rounded-lg">
								<span className="shine-effect absolute inset-0 rounded-lg"></span>
							</span>
							<span className="relative">Да, мне есть 18</span>
						</span>
					</motion.button>

					<motion.button
						onClick={redirectToGoogle}
						className="inline-flex items-center justify-center rounded-lg bg-muted/80 px-8 py-3 font-medium text-foreground shadow-md transition-all duration-300 hover:bg-muted hover:shadow-lg"
						whileHover={{ scale: 1.03 }}
						whileTap={{ scale: 0.98 }}
					>
						<span className="relative">Нет, мне нет 18</span>
					</motion.button>
				</div>

				<DialogFooter className="flex-col">
					<p className="border-primary/10 border-t pt-3 text-center text-muted-foreground text-sm">
						В соответствии со ст. 20 ФЗ №15 «Об охране здоровья граждан» лицам,
						не достигшим 18 лет пользование данным сайтом запрещено.
					</p>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
}

// CSS for full-page blur overlay when dialog is open
export function AgeVerificationStyles() {
	return (
		<style jsx global>{`
            body.age-verification-open > :not([role="dialog"]) {
                filter: blur(8px);
                pointer-events: none;
                transition: filter 0.2s ease-out;
            }
            
            .shine-effect {
                background: linear-gradient(
                    90deg, 
                    transparent, 
                    rgba(255, 255, 255, 0.2), 
                    transparent
                );
                animation: shine 1.5s infinite;
                transform: translateX(-100%);
            }
            
            @keyframes shine {
                100% {
                    transform: translateX(100%);
                }
            }
        `}</style>
	);
}
