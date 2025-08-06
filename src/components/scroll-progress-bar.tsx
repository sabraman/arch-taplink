"use client";

import { motion, useScroll } from "framer-motion";
import { useEffect, useState } from "react";

export function ScrollProgressBar() {
	const { scrollYProgress } = useScroll();
	const [isVisible, setIsVisible] = useState(false);

	useEffect(() => {
		const handleScroll = () => {
			// Show the progress bar only after scrolling down a bit
			if (window.scrollY > 100) {
				setIsVisible(true);
			} else {
				setIsVisible(false);
			}
		};

		window.addEventListener("scroll", handleScroll);
		return () => window.removeEventListener("scroll", handleScroll);
	}, []);

	return (
		<motion.div
			className={`fixed top-0 right-0 left-0 z-50 h-0.5 origin-left bg-primary ${
				isVisible ? "opacity-60" : "opacity-0"
			}`}
			style={{ scaleX: scrollYProgress }}
			initial={{ opacity: 0 }}
			animate={{ opacity: isVisible ? 0.6 : 0 }}
			transition={{ duration: 0.3 }}
		/>
	);
}
