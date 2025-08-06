/*
 * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation. This is especially useful
 * for Docker builds.
 */
import "./src/env.js";

/** @type {import("next").NextConfig} */
const config = {
	// Performance optimizations
	compress: true,
	poweredByHeader: false,

	// Modern JavaScript support - reduce legacy polyfills
	compiler: {
		removeConsole: process.env.NODE_ENV === "production",
	},

	// Experimental features for better performance
	experimental: {
		optimizePackageImports: ["framer-motion", "lucide-react"],
	},

	// Image optimization
	images: {
		formats: ["image/webp", "image/avif"],
		minimumCacheTTL: 60,
	},

	// Turbopack configuration for better performance
	turbopack: {
		// Configure resolve aliases for better module resolution
		resolveAlias: {
			"~": "./src",
		},
		// Configure custom extensions
		resolveExtensions: [".tsx", ".ts", ".jsx", ".js", ".json"],
	},

	// Bundle analyzer for optimization
	webpack: (config, { dev, isServer }) => {
		// Optimize bundle splitting
		if (!dev && !isServer) {
			config.optimization.splitChunks = {
				chunks: "all",
				cacheGroups: {
					vendor: {
						test: /[\\/]node_modules[\\/]/,
						name: "vendors",
						chunks: "all",
					},
					common: {
						name: "common",
						minChunks: 2,
						chunks: "all",
						enforce: true,
					},
				},
			};
		}

		return config;
	},
};

export default config;
