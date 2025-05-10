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
	title: "ARCH – Табак и аксессуары в Санкт-Петербург. Доверие с первой затяжки.",
	description: "ARCH – доверие с первой затяжки",
	applicationName: "ARCH",
	appleWebApp: {
		capable: true,
		title: "ARCH",
		statusBarStyle: "black-translucent",
	},
	openGraph: {
		title: "ARCH – Табак и аксессуары в Санкт-Петербург. Доверие с первой затяжки.",
		description: "ARCH – доверие с первой затяжки",
		url: process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "http://localhost:3000",
		siteName: "ARCH",
		images: [
			{
				url: new URL("/og", process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "http://localhost:3000"),
				width: 1200,
				height: 630,
				alt: "ARCH OG Image",
			},
		],
		locale: "ru_RU",
		type: "website",
	},
	manifest: "/manifest.webmanifest",
	icons: {
		icon: [
			{ url: "/favicon.ico", type: "image/x-icon", sizes: "any" },
			{ url: "/favicon-16x16.png", type: "image/png", sizes: "16x16" },
			{ url: "/favicon-32x32.png", type: "image/png", sizes: "32x32" },
			{ url: "/favicon-48x48.png", type: "image/png", sizes: "48x48" },
		],
		apple: [
			{ url: "/apple-touch-icon.png", type: "image/png" },
			{ url: "/apple-touch-icon-57x57.png", sizes: "57x57", type: "image/png" },
			{ url: "/apple-touch-icon-60x60.png", sizes: "60x60", type: "image/png" },
			{ url: "/apple-touch-icon-72x72.png", sizes: "72x72", type: "image/png" },
			{ url: "/apple-touch-icon-76x76.png", sizes: "76x76", type: "image/png" },
			{ url: "/apple-touch-icon-114x114.png", sizes: "114x114", type: "image/png" },
			{ url: "/apple-touch-icon-120x120.png", sizes: "120x120", type: "image/png" },
			{ url: "/apple-touch-icon-144x144.png", sizes: "144x144", type: "image/png" },
			{ url: "/apple-touch-icon-152x152.png", sizes: "152x152", type: "image/png" },
			{ url: "/apple-touch-icon-167x167.png", sizes: "167x167", type: "image/png" },
			{ url: "/apple-touch-icon-180x180.png", sizes: "180x180", type: "image/png" },
			{ url: "/apple-touch-icon-1024x1024.png", sizes: "1024x1024", type: "image/png" },
		],
	},
	themeColor: "#B133FF",
	twitter: {
		card: "summary_large_image",
		title: "ARCH – Табак, вейпы, жидкости в Санкт-Петербурге",
		description: "ARCH – доверие с первой затяжки",
		images: ["/og"], // Points to the new OG image route
	},
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
				<meta name="msapplication-config" content="/browserconfig.xml" />
				<link rel="yandex-tableau-widget" href="/yandex-browser-manifest.json" />
				<script
					type="application/ld+json"
					dangerouslySetInnerHTML={{
						__html: JSON.stringify({
							"@context": "https://schema.org",
							"@type": "LocalBusiness",
							name: "ARCH",
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