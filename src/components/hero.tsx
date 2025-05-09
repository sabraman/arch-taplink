"use client"; // For Framer Motion and potential client-side interactions

import {
    motion,
    useReducedMotion,
    useScroll,
    useTransform,
} from "framer-motion";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

// Import SVG as component
const PawIcon = () => (
    <svg
        width="34"
        height="30"
        viewBox="0 0 315 279"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="text-primary"
    >
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

// Smoke effect component
const SmokeEffect = () => {
    return (
        <div className="absolute inset-0 overflow-hidden opacity-40">
            <div className="absolute top-0 left-0 h-full w-full">
                {Array.from({ length: 5 }).map((_, index) => (
                    <motion.div
                        key={index}
                        className="absolute"
                        style={{
                            width: `${100 + index * 20}px`,
                            height: `${200 + index * 40}px`,
                            borderRadius: "50%",
                            filter: "blur(40px)",
                            opacity: 0.03 + index * 0.01,
                            backgroundColor: "#FF731D",
                            left: `${10 + index * 20}%`,
                            top: `${30 + (index % 3) * 10}%`,
                        }}
                        animate={{
                            y: [0, -30, 0],
                            opacity: [
                                0.03 + index * 0.01,
                                0.08 + index * 0.01,
                                0.03 + index * 0.01,
                            ],
                        }}
                        transition={{
                            duration: 8 + index,
                            repeat: Number.POSITIVE_INFINITY,
                            ease: "easeInOut",
                            delay: index * 0.5,
                        }}
                    />
                ))}
            </div>
        </div>
    );
};

export function Hero() {
    const shouldReduceMotion = useReducedMotion();
    const sectionRef = useRef<HTMLElement>(null);
    const { scrollY } = useScroll();
    const y = useTransform(scrollY, [0, 300], [0, shouldReduceMotion ? 0 : 15]);
    const scale = useTransform(scrollY, [0, 300], [1, 0.92]);
    const opacity = useTransform(scrollY, [0, 200], [1, 0.6]);

    // Mouse position for subtle interaction effect
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

    // References for parallax effects
    const bgPawsRef = useRef<HTMLDivElement>(null);

    // Generate shapes for decorative background
    const [paws, setPaws] = useState<
        { x: number; y: number; rotation: number; size: number; opacity: number }[]
    >([]);

    useEffect(() => {
        if (shouldReduceMotion) return;

        // Generate random paw positions
        const newPaws = Array.from({ length: 18 }, () => ({
            x: Math.random() * 100,
            y: Math.random() * 100,
            rotation: Math.random() * 360,
            size: 2 + Math.random() * 4,
            opacity: 0.03 + Math.random() * 0.06,
        }));

        setPaws(newPaws);

        // Handle mouse move for subtle interactions
        const handleMouseMove = (e: MouseEvent) => {
            const { clientX, clientY } = e;
            const { innerWidth, innerHeight } = window;

            setMousePosition({
                x: clientX / innerWidth,
                y: clientY / innerHeight,
            });
        };

        window.addEventListener("mousemove", handleMouseMove);

        return () => {
            window.removeEventListener("mousemove", handleMouseMove);
        };
    }, [shouldReduceMotion]);

    const heroVariants = {
        hidden: { opacity: 0, scale: shouldReduceMotion ? 1 : 0.96 },
        visible: {
            opacity: 1,
            scale: 1,
            transition: {
                duration: 1,
                ease: [0.22, 1, 0.36, 1],
            },
        },
    };

    const floatAnimation = {
        y: [0, -10, 0],
        transition: {
            duration: 6,
            repeat: Number.POSITIVE_INFINITY,
            repeatType: "reverse" as const,
            ease: "easeInOut",
        },
    };

    // Gradient overlay for depth
    const gradientOverlay = {
        background:
            "radial-gradient(circle at 50% 50%, rgba(43, 40, 39, 0) 0%, rgba(43, 40, 39, 0.7) 70%, rgba(43, 40, 39, 0.9) 100%)",
        position: "absolute" as const,
        inset: 0,
        zIndex: 1,
    };

    return (
        <motion.section
            ref={sectionRef}
            className="relative flex min-h-[70vh] w-full flex-col items-center justify-center overflow-hidden pt-16 pb-12 md:min-h-[80vh] md:pt-24 md:pb-20 lg:pt-32 lg:pb-24"
            initial="hidden"
            animate="visible"
            variants={heroVariants}
            onViewportEnter={() => {
                document.body.classList.add("hero-in-view");
            }}
            onViewportLeave={() => {
                document.body.classList.remove("hero-in-view");
            }}
        >
            {/* Decorative Background with Paw Prints and Effects */}
            <div className="-z-10 absolute inset-0 overflow-hidden">
                {/* Smoke effect */}
                <SmokeEffect />

                {/* Subtle texture overlay */}
                <div
                    className="absolute inset-0 z-10 opacity-20"
                    style={{
                        backgroundImage:
                            "url('data:image/png;base64,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')",
                    }}
                ></div>

                {/* Parallax atmosphere */}
                <div className="absolute inset-0 bg-gradient-to-b from-primary/[0.03] to-transparent opacity-40 mix-blend-overlay"></div>

                {/* Paw prints background */}
                <div ref={bgPawsRef} className="absolute inset-0 opacity-20">
                    {!shouldReduceMotion &&
                        paws.map((paw, i) => (
                            <motion.div
                                key={i}
                                className="absolute"
                                style={{
                                    top: `${paw.y}%`,
                                    left: `${paw.x}%`,
                                    rotate: `${paw.rotation}deg`,
                                    opacity: paw.opacity,
                                }}
                                animate={{
                                    opacity: [paw.opacity, paw.opacity * 1.5, paw.opacity],
                                    y: ["0%", "3%", "0%"],
                                    x: [
                                        `${paw.x}%`,
                                        `${paw.x + (mousePosition.x - 0.5) * 5}%`,
                                        `${paw.x}%`,
                                    ],
                                }}
                                transition={{
                                    duration: 3 + (i % 3),
                                    repeat: Number.POSITIVE_INFINITY,
                                    repeatType: "reverse",
                                    ease: "easeInOut",
                                    delay: i * 0.1,
                                }}
                            >
                                <PawIcon />
                            </motion.div>
                        ))}
                </div>

                {/* Gradient overlay for depth */}
                <div style={gradientOverlay}></div>
            </div>

            {/* Logo Container with Parallax Effect */}
            <motion.div
                className="relative z-10 mx-auto flex w-full max-w-4xl flex-col items-center px-6"
                style={{ y, scale, opacity }}
            >
                {/* Main Logo with enhanced effects */}
                <motion.div
                    className="relative mb-10 w-full max-w-md"
                    animate={floatAnimation}
                >
                    {/* Enhanced glow effect */}
                    <motion.div
                        className="-inset-14 absolute rounded-full bg-gradient-to-br from-primary/10 to-primary/5 blur-3xl"
                        animate={{
                            opacity: [0.7, 0.9, 0.7],
                            scale: [1, 1.05, 1],
                        }}
                        transition={{
                            duration: 8,
                            repeat: Number.POSITIVE_INFINITY,
                            repeatType: "reverse",
                        }}
                    />

                    <motion.div
                        className="relative"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1, delay: 0.3 }}
                    >
                        {/* Logo with reflective shine effect */}
                        <div className="relative overflow-hidden rounded-3xl">
                            <Image
                                src="/arch-logo.svg"
                                alt="ARCH Лого"
                                width={600}
                                height={248}
                                priority
                                className="h-auto w-full drop-shadow-2xl filter"
                            />

                            {/* Animated shine effect */}
                            <motion.div
                                className="absolute inset-0 opacity-30"
                                style={{
                                    background:
                                        "linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)",
                                    width: "200%",
                                    transform: "translateX(-100%)",
                                }}
                                animate={{ x: ["0%", "100%"] }}
                                transition={{
                                    duration: 6,
                                    repeat: Number.POSITIVE_INFINITY,
                                    repeatDelay: 8,
                                    ease: "easeInOut",
                                }}
                            />
                        </div>
                    </motion.div>
                </motion.div>

                {/* Slogan with better styling */}
                <motion.div
                    className="relative mt-4"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5, duration: 0.8 }}
                >
                    <motion.div
                        className="rounded-lg bg-gradient-to-r from-primary/5 via-primary/15 to-primary/5 px-4 py-3 font-medium text-2xl text-white/90 tracking-tight shadow-inner backdrop-blur-sm md:text-3xl"
                        whileHover={{
                            scale: 1.02,
                            transition: { duration: 0.2 },
                        }}
                    >
                        {/* Fancy gradient text effect */}
                        <span className="bg-gradient-to-r from-white via-white/95 to-white/90 bg-clip-text text-transparent">
                            доверие с первой затяжки
                        </span>
                    </motion.div>

                    {/* Subtle underline animation */}
                    <motion.div
                        className="mt-1 h-0.5 bg-gradient-to-r from-primary/0 via-primary/40 to-primary/0"
                        initial={{ width: "0%", opacity: 0 }}
                        animate={{ width: "80%", opacity: 1 }}
                        transition={{ delay: 0.9, duration: 0.8 }}
                        style={{ margin: "0 auto" }}
                    />
                </motion.div>
            </motion.div>
        </motion.section>
    );
}
