const logger = {
	error: (message: string, error?: unknown, context?: object) => {
		console.error(`[ERROR] ${message}`, {
			error,
			context,
			timestamp: new Date().toISOString()
		});

		return null;
	},

	warn: (message: string, data?: object) => {
		console.warn(`[WARN] ${message}`, data);
	},

	info: (message: string, data?: object) => {
		console.log(`[INFO] ${message}`, data);
	}
};

export default logger;