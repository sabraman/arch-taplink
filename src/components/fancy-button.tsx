"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

type FancyButtonProps = {
	href: string;
	label: string;
	icon?: React.ReactNode;
	gradient?: string;
	target?: string;
	rel?: string;
	onClick?: () => void;
};

export function FancyButton({
	href,
	label,
	icon,
	gradient = "from-primary to-primary/80",
	target,
	rel,
	onClick,
}: FancyButtonProps) {
	const [hovered, setHovered] = useState(false);
	const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
	const buttonRef = useRef<HTMLDivElement>(null);

	// Handle mouse move for spotlight effect
	const handleMouseMove = (e: React.MouseEvent) => {
		if (!buttonRef.current) return;

		const rect = buttonRef.current.getBoundingClientRect();
		setMousePosition({
			x: e.clientX - rect.left,
			y: e.clientY - rect.top,
		});
	};

	return (
		<motion.div
			ref={buttonRef}
			onMouseMove={handleMouseMove}
			onMouseEnter={() => setHovered(true)}
			onMouseLeave={() => setHovered(false)}
			className="relative w-full overflow-hidden rounded-lg"
			whileHover={{ scale: 1.02 }}
			whileTap={{ scale: 0.98 }}
		>
			<Link
				href={href}
				target={target}
				rel={rel}
				onClick={onClick}
				className="block"
			>
				{/* Base gradient */}
				<div
					className={`absolute inset-0 bg-gradient-to-r ${gradient} transition-all duration-300 ease-out`}
				/>

				{/* Spotlight gradient effect - follows mouse */}
				{hovered && (
					<div
						className="absolute inset-0 bg-radial-gradient opacity-20"
						style={{
							background: `radial-gradient(circle 100px at ${mousePosition.x}px ${mousePosition.y}px, rgba(255,255,255,0.2), transparent 40%)`,
						}}
					/>
				)}

				{/* Shine effect animation on hover */}
				{hovered && (
					<motion.div
						className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-15"
						initial={{ x: "-100%" }}
						animate={{ x: "100%" }}
						transition={{ duration: 0.6, ease: "easeOut" }}
					/>
				)}

				{/* Subtle border */}
				<div className="absolute inset-0 rounded-lg border border-white/10" />

				{/* Content with shadow for depth */}
				<div className="relative flex items-center justify-center px-4 py-3">
					<span className="flex items-center justify-center text-white drop-shadow-sm filter">
						{icon && <span className="mr-2 flex items-center">{icon}</span>}
						<span className="font-medium">{label}</span>
					</span>
				</div>
			</Link>
		</motion.div>
	);
}
