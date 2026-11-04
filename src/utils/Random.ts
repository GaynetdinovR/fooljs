type Rng = () => number;

let rng: Rng = Math.random;

export const Random = {
	/**
	 * Устанавливает кастомный генератор (для симулятора)
	 */
	set: (newRng: Rng): void => {
		rng = newRng;
	},

	/**
	 * Возвращает следующее число в [0, 1)
	 */
	get: (): number => {
		return rng();
	},

	/**
	 * Возвращает случайный элемент массива
	 */
	getArrayElem: <T>(array: T[]): T | undefined => {
		if (!array || array.length === 0) return;

		return array[Math.floor(rng() * array.length)];
	},

	getArrayElemStrict: <T>(arr: readonly [T, ...T[]]): T => {
		return arr[Math.floor(Math.random() * arr.length)];
	}
};