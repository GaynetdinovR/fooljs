export const formatToMs = (seconds: number): number => seconds * 1000

export const formatCardToBeat = (card) => {
	return {
		...card,
		isBeaten: false,
	}
}

export const delay = (ms: number): Promise<void> => {
	return new Promise((resolve) => {
		setTimeout(resolve, ms);
	});
};