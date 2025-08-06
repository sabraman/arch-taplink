"use client";

import { CircleXIcon, SearchIcon } from "lucide-react";
import { useId, useRef, useState } from "react";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { cn } from "~/lib/utils";

interface ProductSearchProps {
	onSearch: (query: string) => void;
	placeholder?: string;
	className?: string;
	"aria-label"?: string;
}

export function ProductSearch({
	onSearch,
	placeholder = "Поиск товаров...",
	className,
	"aria-label": ariaLabel = "Поиск товаров",
}: ProductSearchProps) {
	const id = useId();
	const [inputValue, setInputValue] = useState("");
	const inputRef = useRef<HTMLInputElement>(null);

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const value = e.target.value;
		setInputValue(value);
		onSearch(value);
	};

	const handleClearInput = () => {
		setInputValue("");
		onSearch("");
		if (inputRef.current) {
			inputRef.current.focus();
		}
	};

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		onSearch(inputValue);
	};

	return (
		<div className="w-full">
			<Label htmlFor={id} className="sr-only">
				{ariaLabel}
			</Label>
			<form onSubmit={handleSubmit} className="w-full">
				<div className="relative w-full">
					<SearchIcon
						className="-translate-y-1/2 pointer-events-none absolute top-1/2 left-4 h-4 w-4 text-muted-foreground"
						aria-hidden="true"
					/>
					<Input
						id={id}
						ref={inputRef}
						className={cn(
							"w-full pl-12 pr-12 rounded-full transition-shadow focus:shadow-lg focus:ring-2 focus:ring-primary/40",
							inputValue && "pr-12"
						)}
						placeholder={placeholder}
						type="search"
						value={inputValue}
						onChange={handleInputChange}
						aria-label={ariaLabel}
						role="searchbox"
						autoComplete="off"
					/>
					{inputValue && (
						<button
							type="button"
							className="absolute inset-y-0 right-0 flex h-full w-10 items-center justify-center rounded-full text-muted-foreground/80 outline-none transition-[color,box-shadow] hover:text-foreground focus:z-10 focus-visible:border-primary focus-visible:ring-[3px] focus-visible:ring-primary/50 disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50"
							aria-label="Очистить поиск"
							onClick={handleClearInput}
						>
							<CircleXIcon size={18} aria-hidden="true" />
						</button>
					)}
				</div>
			</form>
		</div>
	);
}
