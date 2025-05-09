"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import type { ReactNode } from "react";

interface SmoothScrollProps {
    children: ReactNode;
}

export function SmoothScroll({ children }: SmoothScrollProps) {
    const [shouldUseSmooth, setShouldUseSmooth] = useState(false);

    useEffect(() => {
        // Only enable smooth scrolling on desktop devices
        // to avoid performance issues on mobile
        const isDesktop = window.matchMedia("(min-width: 768px)").matches;

        // Check for reduced motion preference
        const prefersReducedMotion = window.matchMedia(
            "(prefers-reduced-motion: reduce)",
        ).matches;

        setShouldUseSmooth(isDesktop && !prefersReducedMotion);

        // Add the smooth scroll class to html element if enabled
        if (isDesktop && !prefersReducedMotion) {
            document.documentElement.style.scrollBehavior = "smooth";
        }

        return () => {
            document.documentElement.style.scrollBehavior = "";
        };
    }, []);

    // Apply smooth scrolling to the main content
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4 }}
        >
            {children}
        </motion.div>
    );
}
