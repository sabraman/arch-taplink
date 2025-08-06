"use client";

import { useId, useRef, useState } from "react";
import { CircleXIcon, SearchIcon } from "lucide-react";
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
	"aria-label": ariaLabel = "Поиск товаров"
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
		<div className={cn("w-full", className)}>
			<Label htmlFor={id} className="sr-only">
				{ariaLabel}
			</Label>
			<form onSubmit={handleSubmit} role="search">
				<div className="relative">
					<SearchIcon 
						className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground pointer-events-none" 
						aria-hidden="true"
					/>
					<Input
						id={id}
						ref={inputRef}
						className={cn(
							"pl-10",
							inputValue && "pr-10"
						)}
						placeholder={placeholder}
						type="search"
						value={inputValue}
						onChange={handleInputChange}
						aria-label={ariaLabel}
						role="searchbox"
						aria-expanded="false"
						autoComplete="off"
					/>
					{inputValue && (
						<button
							type="button"
							className="text-muted-foreground/80 hover:text-foreground focus-visible:border-primary focus-visible:ring-primary/50 absolute inset-y-0 right-0 flex h-full w-9 items-center justify-center rounded-r-md transition-[color,box-shadow] outline-none focus:z-10 focus-visible:ring-[3px] disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50"
							aria-label="Очистить поиск"
							onClick={handleClearInput}
						>
							<CircleXIcon size={16} aria-hidden="true" />
						</button>
					)}
				</div>
			</form>
		</div>
	);
}