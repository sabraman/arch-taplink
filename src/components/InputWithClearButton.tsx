"use client";

import { CircleXIcon } from "lucide-react";
import { useId, useRef, useState } from "react";

import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";

export default function InputWithClearButton() {
	const id = useId();
	const [inputValue, setInputValue] = useState("Click to clear");
	const inputRef = useRef<HTMLInputElement>(null);

	const handleClearInput = () => {
		setInputValue("");
		if (inputRef.current) {
			inputRef.current.focus();
		}
	};

	return (
		<div className="*:not-first:mt-2">
			<Label htmlFor={id}>Input with clear button</Label>
			<div className="relative">
				<Input
					id={id}
					ref={inputRef}
					className="pe-9"
					placeholder="Type something..."
					type="text"
					value={inputValue}
					onChange={(e) => setInputValue(e.target.value)}
				/>
				{inputValue && (
					<button
						type="button"
						className="absolute inset-y-0 end-0 flex h-full w-9 items-center justify-center rounded-e-md text-muted-foreground/80 outline-none transition-[color,box-shadow] hover:text-foreground focus:z-10 focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50"
						aria-label="Clear input"
						onClick={handleClearInput}
					>
						<CircleXIcon size={16} aria-hidden="true" />
					</button>
				)}
			</div>
		</div>
	);
}
