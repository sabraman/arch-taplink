"use client";

import { Component, type ErrorInfo, type ReactNode } from "react";
import { AlertCircle, RefreshCwIcon } from "lucide-react";
import { Button } from "./button";

interface Props {
	children?: ReactNode;
	fallback?: ReactNode;
}

interface State {
	hasError: boolean;
	error?: Error;
}

export class ErrorBoundary extends Component<Props, State> {
	public state: State = {
		hasError: false,
	};

	public static getDerivedStateFromError(error: Error): State {
		return { hasError: true, error };
	}

	public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
		console.error("Uncaught error:", error, errorInfo);
	}

	private handleRetry = () => {
		this.setState({ hasError: false, error: undefined });
	};

	public render() {
		if (this.state.hasError) {
			if (this.props.fallback) {
				return this.props.fallback;
			}

			return (
				<div className="flex flex-col items-center justify-center min-h-[200px] p-8 text-center space-y-4">
					<AlertCircle className="h-12 w-12 text-destructive" aria-hidden="true" />
					<div className="space-y-2">
						<h2 className="text-xl font-semibold">Что-то пошло не так</h2>
						<p className="text-muted-foreground max-w-md">
							Произошла ошибка при загрузке содержимого. Пожалуйста, попробуйте еще раз.
						</p>
					</div>
					<Button 
						onClick={this.handleRetry}
						variant="outline"
						className="flex items-center space-x-2"
						aria-label="Повторить попытку"
					>
						<RefreshCwIcon className="h-4 w-4" aria-hidden="true" />
						<span>Попробовать еще раз</span>
					</Button>
				</div>
			);
		}

		return this.props.children;
	}
}

export function ErrorFallback({ 
	error, 
	resetError,
	title = "Произошла ошибка",
	description = "Попробуйте перезагрузить страницу или обратитесь в поддержку."
}: {
	error?: Error;
	resetError?: () => void;
	title?: string;
	description?: string;
}) {
	return (
		<div 
			className="flex flex-col items-center justify-center min-h-[200px] p-8 text-center space-y-4 border border-destructive/20 rounded-lg bg-destructive/5"
			role="alert"
			aria-live="assertive"
		>
			<AlertCircle className="h-10 w-10 text-destructive" aria-hidden="true" />
			<div className="space-y-2">
				<h3 className="text-lg font-semibold text-destructive">{title}</h3>
				<p className="text-sm text-muted-foreground max-w-md">
					{description}
				</p>
				{error && process.env.NODE_ENV === "development" && (
					<details className="mt-4 text-xs text-left bg-muted p-3 rounded border">
						<summary className="cursor-pointer font-medium mb-2">
							Техническая информация
						</summary>
						<pre className="whitespace-pre-wrap overflow-auto">
							{error.message}
							{error.stack && `\n\n${error.stack}`}
						</pre>
					</details>
				)}
			</div>
			{resetError && (
				<Button 
					onClick={resetError}
					variant="outline"
					size="sm"
					className="flex items-center space-x-2"
				>
					<RefreshCwIcon className="h-4 w-4" aria-hidden="true" />
					<span>Попробовать еще раз</span>
				</Button>
			)}
		</div>
	);
}

export function LoadingError({ onRetry }: { onRetry?: () => void }) {
	return (
		<ErrorFallback
			title="Ошибка загрузки"
			description="Не удалось загрузить данные. Проверьте подключение к интернету и попробуйте еще раз."
			resetError={onRetry}
		/>
	);
}

export function NotFoundError({ message = "Содержимое не найдено" }: { message?: string }) {
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