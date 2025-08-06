"use client";

import { motion } from "framer-motion";
import { Home, MessageCircle, Phone, Send } from "lucide-react";
import Link from "next/link";

// Custom SVG for 2GIS
const GisIcon = () => (
	<svg
		width="24"
		height="24"
		viewBox="0 0 565 586"
		fill="currentColor"
		aria-hidden="true"
	>
		<title>Иконка 2GIS</title>
		<path d="M419.026 348.116C317.141 348.633 300.66 412.255 295.167 466.05L292.67 489.843H272.191L269.695 466.05C264.202 412.255 247.221 348.633 148.831 348.116C132.35 312.94 125.358 284.491 125.358 252.422C125.358 172.249 188.787 97.2442 282.679 97.2442C376.573 97.2442 439.003 171.729 439.003 252.941C439.003 284.491 436.007 312.94 419.026 348.116ZM281.682 0C126.858 0 0 131.384 0 292.249C0 453.635 126.858 585.017 281.682 585.017C438.003 585.017 564.362 453.635 564.362 292.249C564.362 131.385 438.003 0 281.682 0Z" />
	</svg>
);

// Custom SVG for Yandex Maps
const YandexMapIcon = () => (
	<svg
		width="24"
		height="24"
		viewBox="0 0 307 384"
		fill="currentColor"
		aria-hidden="true"
	>
		<title>Иконка Яндекс Карты</title>
		<path d="M153.5 0C238.278 0 307 68.7219 307 153.5C307 195.874 289.831 234.241 262.062 262.017C234.287 289.808 168.85 330.025 165.013 372.237C164.437 378.567 159.855 383.75 153.5 383.75C147.145 383.75 142.563 378.567 141.987 372.237C138.15 330.025 72.7133 289.808 44.9375 262.017C17.1693 234.241 0 195.874 0 153.5C2.06206e-06 68.7219 68.7219 2.06152e-06 153.5 0ZM153.497 99.7354C123.826 99.7356 99.7725 123.789 99.7725 153.46C99.7725 183.131 123.826 207.184 153.497 207.185C183.169 207.185 207.222 183.131 207.222 153.46C207.222 123.788 183.169 99.7354 153.497 99.7354Z" />
	</svg>
);

const contactLinks = [
	{
		id: "address",
		label: "Полтавский пр., 2, Санкт-Петербург",
		href: "https://yandex.ru/maps/-/CHrszN9D",
		icon: <Home size={24} strokeWidth={1.5} />,
		color: "#2B2827",
		ariaLabel: "Открыть адрес в Яндекс Картах",
	},
	{
		id: "phone",
		label: "+7 985 669-68-70",
		href: "tel:+79856696870",
		icon: <Phone size={24} strokeWidth={1.5} />,
		color: "#FF731D",
		ariaLabel: "Позвонить по номеру +7 985 669-68-70",
	},
	{
		id: "telegram",
		label: "Telegram",
		href: "https://t.me/arch_smoke",
		icon: <Send size={24} strokeWidth={1.5} />,
		target: "_blank",
		rel: "noopener noreferrer",
		color: "#28A8EA",
		ariaLabel: "Написать в Telegram",
	},
	{
		id: "whatsapp",
		label: "WhatsApp",
		href: "https://api.whatsapp.com/send/?phone=79856696870&text=%D0%97%D0%B4%D1%80%D0%B0%D0%B2%D1%81%D1%82%D0%B2%D1%83%D0%B9%D1%82%D0%B5,&type=phone_number&app_absent=0",
		icon: <MessageCircle size={24} strokeWidth={1.5} />,
		target: "_blank",
		rel: "noopener noreferrer",
		color: "#25D366",
		ariaLabel: "Написать в WhatsApp",
	},
	{
		id: "yandex",
		label: "Яндекс Карты",
		href: "https://yandex.ru/maps/-/CHrszN9D",
		icon: <YandexMapIcon />,
		target: "_blank",
		rel: "noopener noreferrer",
		color: "#FC3F1D",
		ariaLabel: "Открыть в Яндекс Картах",
	},
	{
		id: "2gis",
		label: "2ГИС",
		href: "https://go.2gis.com/llHWm",
		icon: <GisIcon />,
		target: "_blank",
		rel: "noopener noreferrer",
		color: "#65A84B",
		ariaLabel: "Открыть в 2ГИС",
	},
];

export function ContactLinks() {
	return (
		<div className="w-full py-2">
			<motion.div
				className="mx-auto grid max-w-md grid-cols-1 gap-4"
				initial={{ opacity: 0, y: 20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.5 }}
			>
				{contactLinks.map((link, index) => (
					<motion.div
						key={link.id}
						initial={{ opacity: 0, scale: 0.9 }}
						animate={{ opacity: 1, scale: 1 }}
						transition={{
							duration: 0.4,
							delay: index * 0.1,
							ease: [0.23, 1, 0.32, 1],
						}}
						whileHover={{ scale: 1.03 }}
						whileTap={{ scale: 0.97 }}
					>
						<Link
							href={link.href}
							target={link.target}
							rel={link.rel}
							className="block"
							aria-label={link.ariaLabel}
							aria-hidden="true"
						>
							<motion.div
								className="relative flex h-[80px] flex-row items-center overflow-hidden rounded-full px-5 py-4 shadow-md"
								style={{
									backgroundColor: link.color,
								}}
								whileHover="hover"
								initial="initial"
								animate="animate"
							>
								{/* Animated shadows */}
								<motion.div
									className="pointer-events-none absolute inset-0"
									variants={{
										initial: {
											boxShadow:
												"inset 5px 4px 10px rgba(254, 224, 155, 0.15), inset -10px -5px 30px rgba(255, 115, 29, 0.1)",
										},
										animate: {
											boxShadow:
												"inset 5px 4px 10px rgba(254, 224, 155, 0.3), inset -10px -5px 30px rgba(255, 115, 29, 0.3)",
										},
										hover: {
											boxShadow:
												"inset 8px 6px 16px rgba(254, 224, 155, 0.4), inset -15px -8px 40px rgba(255, 115, 29, 0.4)",
										},
									}}
									transition={{
										boxShadow: {
											duration: 1.2,
											repeat: Number.POSITIVE_INFINITY,
											repeatType: "reverse",
											ease: "easeInOut",
										},
									}}
								/>

								<div
									className="mr-4 flex flex-shrink-0 items-center justify-center text-white"
									style={{ width: 44, height: 44 }}
								>
									{link.icon}
								</div>
								<div className="font-medium text-white">
									{link.id === "address" ? "Полтавский пр., 2" : link.label}
								</div>
							</motion.div>
						</Link>
					</motion.div>
				))}
			</motion.div>
		</div>
	);
}
