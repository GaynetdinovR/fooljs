import { ErrorInfo, ReactNode, useEffect, useState } from 'react';
import logger from '@/utils/log.ts';

interface ErrorBoundaryProps {
	children: ReactNode;
	fallback?: ReactNode;
	onError?: (error: Error, errorInfo: ErrorInfo) => void;
}

const ErrorBoundary = ({
						   children,
						   onError,
					   }: ErrorBoundaryProps) => {
	const [hasError, setHasError] = useState<boolean>(false);
	const [error, setError] = useState<Error | null>(null);

	useEffect(() => {
		const handleError = (event: ErrorEvent) => {
			const error = event.error;
			setError(error);
			setHasError(true);
			logger.error('Global error caught', error);
			onError?.(error, { componentStack: event.filename || '' });
		};

		const handleRejection = (event: PromiseRejectionEvent) => {
			const error = event.reason;
			setError(error);
			setHasError(true);
			logger.error('Unhandled promise rejection', error);
			onError?.(error, { componentStack: '' });
		};

		window.addEventListener('error', handleError);
		window.addEventListener('unhandledrejection', handleRejection);

		return () => {
			window.removeEventListener('error', handleError);
			window.removeEventListener('unhandledrejection', handleRejection);
		};
	}, [onError]);

	if (hasError) {
		return (
			<div className="error-fallback">
				<h2>Что-то пошло не так</h2>
				{error && <p>{error.message}</p>}
				<button onClick={() => setHasError(false)}>
					Попробовать снова
				</button>
			</div>
		);
	}

	return children;
};

export default ErrorBoundary;