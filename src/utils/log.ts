const log = {
	error: (message: string, error?: unknown) => {
		console.error(`[ERROR] ${message}`, {
			error,
			timestamp: new Date().toISOString()
		});

		return null;
	},

	warn: (message: string, data?: object) => {
		console.warn(`[WARN] ${message}`, data);
	},

	info: (message: string, data?: object) => {
		console.log(`[INFO] ${message}`, data);
	},

	withLogger: <T>(fn, context: string): T => {
		try{
			return fn()
		} catch (error) {
			log.error(`Error in ${context}: ${error}`)
		}
	}
};

export default log;