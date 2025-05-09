import type { Metadata } from "next";
import { Nunito } from "next/font/google";
import "~/styles/globals.css";
import {
	AgeVerification,
	AgeVerificationStyles,
} from "~/components/age-verification";
import { cn } from "~/lib/utils";
import { PostHogProvider } from "~/components/PostHogProvider";

const nunito = Nunito({
	subsets: ["latin", "cyrillic"],
	variable: "--font-sans",
	weight: ["400", "500", "600", "700", "800"],
	display: "swap",
});

export const metadata: Metadata = {
	title: "ARCH SMOKE – Табак и аксессуары в Санкт-Петербург. Доверие с первой затяжки.",
	description: "ARCH SMOKE – доверие с первой затяжки",
	icons: {
		icon: [
			{ url: "/favicon.svg", type: "image/svg+xml" },
			{ url: "/favicon.ico", sizes: "any" }
		],
		apple: [
			{ url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
			{ url: "/favicon.svg", type: "image/svg+xml" }
		],
	},
	manifest: "/manifest.json",
	themeColor: "#B133FF",
};

export default function RootLayout({
	children,
}: { children: React.ReactNode }) {
	return (
		<html
			lang="ru"
			className={cn("dark", nunito.variable)}
			suppressHydrationWarning
		>
			<head>
				{/* Add any head specific tags here, e.g., for analytics (Plausible later) or verification */}
				<script
					type="application/ld+json"
					dangerouslySetInnerHTML={{
						__html: JSON.stringify({
							"@context": "https://schema.org",
							"@type": "LocalBusiness",
							name: "ARCH SMOKE",
							telephone: "+79856696870",
							openingHours: "Mo-Su 11:00-22:30",
							address: {
								"@type": "PostalAddress",
								streetAddress: "Полтавский пр., 2",
								addressLocality: "Санкт-Петербург",
								postalCode: "191036",
								addressCountry: "Россия",
							},
							image: "/arch-corgi-logo.svg",
							url: "/", // Assuming this is the main page URL
						}),
					}}
				/>
			</head>
			<body className="flex min-h-screen flex-col">
				<PostHogProvider>
					<AgeVerification />
					<AgeVerificationStyles />
					{children}
				</PostHogProvider>
			</body>
		</html>
	);
}