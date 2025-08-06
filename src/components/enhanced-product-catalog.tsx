"use client";

import { AnimatePresence, motion } from "framer-motion";
import {
	ChevronDownIcon,
	ChevronRight,
	Cigarette,
	CircuitBoard,
	Droplet,
	Flame,
	Globe,
	Leaf,
	Package,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { useState, useMemo, useEffect } from "react";
import * as React from "react";

import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from "~/components/ui/accordion";
import {
	Collapsible,
	CollapsibleContent,
	CollapsibleTrigger,
} from "~/components/ui/collapsible";
import { ProductSearch } from "~/components/product-search";
import { ProductCatalogSkeleton } from "~/components/ui/website-skeletons";
import { ErrorBoundary, ErrorFallback } from "~/components/ui/error-boundary";

function NotFoundError({ message = "Содержимое не найдено" }: { message?: string }) {
	return (
		<div className="flex flex-col items-center justify-center min-h-[200px] p-8 text-center space-y-4">
			<div className="text-6xl opacity-50" role="img" aria-label="Не найдено">
				🔍
			</div>
			<div className="space-y-2">
				<h3 className="text-lg font-semibold">Ничего не найдено</h3>
				<p className="text-muted-foreground">{message}</p>
			</div>
		</div>
	);
}

// Import SVG as component
const PawIcon = () => (
	<svg
		width="16"
		height="16"
		viewBox="0 0 315 279"
		fill="none"
		xmlns="http://www.w3.org/2000/svg"
		className="text-primary/40"
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

// Type definitions
type ProductModel = {
	name: string;
};

type ProductBrand = {
	name: string;
	models: string[];
};

type ProductCategory = {
	id: string;
	icon: LucideIcon;
	title: string;
	description: string;
	brands: ProductBrand[];
};

// Define the product categories and items
const productData: ProductCategory[] = [
	{
		id: "cigarettes",
		icon: Cigarette,
		title: "Одноразовые электронные сигареты",
		description: "Широкий выбор премиальных одноразовых устройств",
		brands: [
			{
				name: "PLONQ",
				models: [
					"Alpha 600",
					"Plus 1500",
					"Plus pro 4000",
					"Max 6000",
					"Max S 8000",
					"Max Pro 10000",
					"Ultra 12000",
					"Roqy 10000",
					"Roqy 20000",
					"Flonq Ultra 20000",
					"Картриджи Meta Pod",
				],
			},
			{
				name: "LOST MARY",
				models: [
					"MO10000",
					"OS12000",
					"BM16000",
					"MO20000 pro",
					"MO30000",
					"PuffBall 30000",
					"Картриджи CD 10000 Pro",
					"OS25000",
					"MT15000 Turbo",
					"20000 mixer+",
					"Картриджи Swap и X-Link (new)",
				],
			},
			{
				name: "ELFBAR",
				models: [
					"BC18000",
					"BC20000",
					"GH23000",
					"GH33000 Pro",
					"Nic King 30000",
					"Sour King 30000",
					"Ice king 30000",
					"Картриджи Elfbar Swap",
				],
			},
			{
				name: "HQD",
				models: ["Ultima Pro 10000"],
			},
			{
				name: "WAKA",
				models: ["soPro PA10000", "soPro 20000", "xland 35000", "blast 38000"],
			},
			{
				name: "PUFFMI",
				models: ["Dura 9000", "Dura 18000", "Tank 20000"],
			},
			{
				name: "VOZOL",
				models: ["Gear Power 20000"],
			},
			{
				name: "HUSKY",
				models: ["Cyber Husky Pro 12000", "Husky&Tikobar Сибирь 12000"],
			},
			{
				name: "FUNKY LANDS",
				models: ["Vi10000", "Di15000"],
			},
			{
				name: "INFLAVE",
				models: [
					"Air 6000",
					"Pro 7000",
					"Power 9000",
					"Omega 10000",
					"Flex 12000",
				],
			},
			{
				name: "FUMMO",
				models: ["Indic 10000", "GTS 18000"],
			},
			{
				name: "GEEK BAR",
				models: ["Pulse 12000", "Watt 20000", "PulseX 25000"],
			},
			{
				name: "ДРУГИЕ БРЕНДЫ",
				models: ["DUALL Bar 12000", "SNOOPYSMOKE 15000", "LOSTVAPE TB18000", "Gang Immortal 16000"],
			},
		],
	},
	{
		id: "liquids",
		icon: Droplet,
		title: "Жидкости",
		description: "Премиальные жидкости для электронных устройств",
		brands: [
			{
				name: "PREMIUM",
				models: [
					"Duall",
					"Soak",
					"Fumo aqua",
					"Fumo aqua sour",
					"Chrome sour",
					"Chrome north",
					"Chrome basic",
					"Chrome pink",
				],
			},
			{
				name: "PLONQ",
				models: ["Жидкость Plonq"],
			},
			{
				name: "INFLAVE",
				models: [
					"Bubble",
					"Loona ELEXIR",
					"Drink bubble",
					"Sour bubble",
					"Mint bubble",
					"Dessert bubble",
				],
			},
			{
				name: "OGGO",
				models: ["Sour", "Reels", "Acid", "Max", "Cherry"],
			},
			{
				name: "RELL",
				models: ["Gray", "Orange", "Ultima 0мг", "Ultimate", "Azure"],
			},
			{
				name: "HUSKY",
				models: ["Import fake", "Double ice"],
			},
			{
				name: "ДРУГИЕ БРЕНДЫ",
				models: [
					"Skala",
					"ElectroJam",
					"Scandalist",
					"IceFox",
					"Злая монашка TPL",
					"Catswill",
					"Catswill sour",
					"Rick & Morty",
					"Barrel",
					"Black Jack",
					"Ice paradise",
				],
			},
		],
	},
	{
		id: "imported",
		icon: Globe,
		title: "Импорт",
		description: "Оригинальные напитки и снеки из-за рубежа",
		brands: [
			{
				name: "НАПИТКИ",
				models: [
					"Dr. Pepper",
					"Monster Energy",
					"Prime",
					"Coca-Cola",
					"Fanta",
					"Sprite",
					"Mountain Dew",
					"Arizona",
					"Arizona energy",
					"Vinut",
					"Toxic waste",
					"Bubble tea",
					"Jumex",
				],
			},
			{
				name: "СНЕКИ",
				models: ["Pringles", "Maltesers", "Toxic Waste", "Shock", "Mentos", "Buldak", "Skittles", "Haocuidian (чипсы из батата)", "Kit Kat"],
			},
		],
	},
	{
		id: "hookah",
		icon: Flame,
		title: "Кальян",
		description: "Табаки и аксессуары для кальяна",
		brands: [
			{
				name: "ТАБАКИ",
				models: [
					"Deus",
					"Musthave",
					"Blackbern",
					"Darkside",
					"Hit (Blackburn)",
					"Bonche",
					"Trofimoff's",
					"Хулиган",
					"Overdose",
					"Palitra",
					"Starline",
					"Joy",
				],
			},
			{
				name: "УГЛИ",
				models: ["Cocoloco", "Joy"],
			},
		],
	},
	{
		id: "tobacco",
		icon: Leaf,
		title: "Табак",
		description: "Стики и аксессуары для курения",
		brands: [
			{
				name: "СТИКИ",
				models: ["Fiit", "Heet"],
			},
			{
				name: "ТАБАК ДЛЯ КУРЕНИЯ",
				models: ["Manitou", "Pepe", "Mac Baren", "Stanley"],
			},
			{
				name: "АКСЕССУАРЫ",
				models: [
					"Трубки курительные",
					"Бумага для самокруток",
					"Зажигалки",
					"Сетки",
					"Гриндеры",
					"Бензин",
					"Газ",
					"Плита (для углей)",
				],
			},
		],
	},
	{
		id: "vaporizers",
		icon: Package,
		title: "Картриджи",
		description: "Всё в наличии, уточняйте у консультантов",
		brands: [],
	},
	{
		id: "devices",
		icon: CircuitBoard,
		title: "Устройства",
		description: "",
		brands: [
			{
				name: "VAPORESSO",
				models: ["Xros 5", "Xros 5 mini"],
			},
			{
				name: "PLONQ",
				models: ["Meta"],
			},
		],
	},
];

export function EnhancedProductCatalog() {
	const [searchQuery, setSearchQuery] = useState("");
	const [isLoading, setIsLoading] = useState(false);
	const [openAccordions, setOpenAccordions] = useState<string[]>(["cigarettes"]);
	const [openCollapsibles, setOpenCollapsibles] = useState<string[]>([]);

	// Filter products based on search query
	const filteredProducts = useMemo(() => {
		if (!searchQuery.trim()) return productData;
		
		const query = searchQuery.toLowerCase().trim();
		return productData.map(category => {
			const filteredBrands = category.brands.filter(brand => {
				// Check if brand name matches
				const brandMatches = brand.name.toLowerCase().includes(query);
				// Check if any model matches
				const modelMatches = brand.models.some(model => 
					model.toLowerCase().includes(query)
				);
				// Check if category title matches
				const categoryMatches = category.title.toLowerCase().includes(query);
				
				return brandMatches || modelMatches || categoryMatches;
			}).map(brand => ({
				...brand,
				// Filter models if brand doesn't match but models do
				models: brand.name.toLowerCase().includes(query) 
					? brand.models 
					: brand.models.filter(model => 
							model.toLowerCase().includes(query)
						)
			}));
			
			return {
				...category,
				brands: filteredBrands
			};
		}).filter(category => 
			category.brands.length > 0 || 
			category.title.toLowerCase().includes(query)
		);
	}, [searchQuery]);

	const handleSearch = (query: string) => {
		setIsLoading(true);
		// Simulate search delay for better UX
		setTimeout(() => {
			setSearchQuery(query);
			setIsLoading(false);
		}, 200);
	};

	// Update open accordions and collapsibles when search results change
	useEffect(() => {
		if (searchQuery.trim()) {
			const matchingCategories = filteredProducts.map(category => category.id);
			setOpenAccordions(matchingCategories);
			
			// Also open all collapsibles that have matches
			const matchingCollapsibles: string[] = [];
			filteredProducts.forEach(category => {
				category.brands.forEach((brand, brandIndex) => {
					const brandId = `${category.id}-brand-${brandIndex}`;
					matchingCollapsibles.push(brandId);
				});
			});
			setOpenCollapsibles(matchingCollapsibles);
		} else {
			// When search is cleared, only close collapsibles but keep user's accordion choices
			setOpenCollapsibles([]);
		}
	}, [filteredProducts, searchQuery]);

	// Highlight matching text
	const highlightText = (text: string, query: string) => {
		if (!query.trim()) return text;
		
		const regex = new RegExp(`(${query})`, 'gi');
		const parts = text.split(regex);
		
		return parts.map((part, index) => 
			regex.test(part) ? (
				<mark key={index} className="bg-primary/30 text-foreground rounded px-1">
					{part}
				</mark>
			) : (
				part
			)
		);
	};

	const hasResults = filteredProducts.length > 0;
	const showNoResults = searchQuery.trim() && !hasResults && !isLoading;

	return (
		<ErrorBoundary>
			<motion.section
				className="mx-auto w-full max-w-5xl overflow-hidden px-4 py-12"
				initial={{ opacity: 0 }}
				animate={{ opacity: 1 }}
				transition={{ duration: 0.8 }}
				role="region"
				aria-labelledby="catalog-heading"
			>
				<div className="mb-10 flex flex-col items-center">
					<motion.h1
						id="catalog-heading"
						className="mb-4 font-semibold text-2xl text-foreground md:text-3xl"
						initial={{ opacity: 0, y: -20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.6, delay: 0.2 }}
					>
						Каталог товаров
					</motion.h1>
					<motion.div
						className="w-full max-w-md mt-4"
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.6, delay: 0.4 }}
					>
						<ProductSearch 
							onSearch={handleSearch}
							placeholder="Поиск товаров, брендов, моделей..."
						/>
					</motion.div>
				</div>

				<div className="w-full overflow-x-clip" role="main">
					{isLoading ? (
						<ProductCatalogSkeleton />
					) : showNoResults ? (
						<NotFoundError 
							message={`Не найдено товаров по запросу "${searchQuery}". Попробуйте изменить поисковый запрос.`}
						/>
					) : (
						<Accordion
							type="multiple"
							className="w-full"
							value={openAccordions}
							onValueChange={setOpenAccordions}
						>
							{filteredProducts.map((category) => (
								<AccordionItem
									value={category.id}
									key={category.id}
									className="border-primary/10 border-b py-2 outline-none has-focus-visible:border-ring has-focus-visible:ring-[3px] has-focus-visible:ring-ring/50"
								>
									<AccordionTrigger 
										className="[&>svg]:-order-1 justify-start gap-3 rounded-md text-[15px] leading-6 outline-none hover:no-underline focus-visible:ring-0"
										aria-expanded="false"
										aria-controls={`${category.id}-content`}
									>
										<span className="flex items-center gap-3">
											<category.icon
												size={16}
												className="shrink-0 text-primary"
												aria-hidden="true"
											/>
											<span className="text-wrap break-words">
												{highlightText(category.title, searchQuery)}
											</span>
										</span>
									</AccordionTrigger>
									<AccordionContent 
										className="p-0"
										id={`${category.id}-content`}
										role="region"
										aria-labelledby={`${category.id}-trigger`}
									>
										{category.description && (
											<div className="p-2 text-muted-foreground text-sm">
												{category.description}
											</div>
										)}
										{category.brands.length > 0
											? category.brands.map((brand, brandIndex) => (
												<BrandCollapsible
													key={`${category.id}-${brandIndex}`}
													brand={brand}
													isFirst={brandIndex === 0}
													categoryId={category.id}
													brandIndex={brandIndex}
													searchQuery={searchQuery}
													highlightText={highlightText}
													openCollapsibles={openCollapsibles}
													setOpenCollapsibles={setOpenCollapsibles}
												/>
											))
											: null}
									</AccordionContent>
								</AccordionItem>
							))}
						</Accordion>
					)}
				</div>

				{/* Decorative paw icon - positioned relative to prevent overflow */}
				<div className="relative mx-auto mt-10 hidden text-center opacity-5 md:block">
					<PawIcon />
				</div>
			</motion.section>
		</ErrorBoundary>
	);
}

function BrandCollapsible({
	brand,
	isFirst,
	categoryId,
	brandIndex,
	searchQuery,
	highlightText,
	openCollapsibles,
	setOpenCollapsibles,
}: { 
	brand: ProductBrand; 
	isFirst: boolean; 
	categoryId: string;
	brandIndex: number;
	searchQuery: string;
	highlightText: (text: string, query: string) => React.ReactNode;
	openCollapsibles: string[];
	setOpenCollapsibles: React.Dispatch<React.SetStateAction<string[]>>;
}) {
	const brandId = `${categoryId}-brand-${brandIndex}`;
	const isOpen = openCollapsibles.includes(brandId);

	const handleToggle = () => {
		setOpenCollapsibles(prev => 
			prev.includes(brandId)
				? prev.filter(id => id !== brandId)
				: [...prev, brandId]
		);
	};

	return (
		<Collapsible
			className={`py-2 ps-6 pe-4 ${!isFirst ? "border-primary/5 border-t" : ""}`}
			open={isOpen}
			onOpenChange={handleToggle}
		>
			<CollapsibleTrigger 
				className="flex gap-2 font-medium text-[15px] text-foreground leading-6 [&[data-state=open]>svg]:rotate-180 w-full text-left"
				aria-expanded="false"
				aria-controls={`${brandId}-content`}
			>
				<ChevronDownIcon
					size={16}
					className="mt-1 shrink-0 opacity-60 transition-transform duration-200"
					aria-hidden="true"
				/>
				<span className="text-wrap break-words">{highlightText(brand.name, searchQuery)}</span>
			</CollapsibleTrigger>
			<CollapsibleContent 
				className="mt-1 overflow-hidden ps-6 text-muted-foreground text-sm transition-all data-[state=closed]:animate-collapsible-up data-[state=open]:animate-collapsible-down"
				id={`${brandId}-content`}
				role="region"
				aria-labelledby={`${brandId}-trigger`}
			>
				<ul className="space-y-1 py-2" role="list">
					{brand.models.map((model, modelIndex) => (
						<motion.li
							key={`${brandId}-model-${modelIndex}`}
							className="flex items-center text-muted-foreground text-sm"
							initial={{ opacity: 0, x: -10 }}
							animate={{ opacity: 1, x: 0 }}
							transition={{ delay: modelIndex * 0.03 }}
							role="listitem"
						>
							<ChevronRight 
								className="mr-1 h-3 w-3 flex-shrink-0 text-primary/40" 
								aria-hidden="true"
							/>
							<span className="text-wrap break-words">{highlightText(model, searchQuery)}</span>
						</motion.li>
					))}
				</ul>
			</CollapsibleContent>
		</Collapsible>
	);
}