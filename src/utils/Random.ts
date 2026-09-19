import log from '@/utils/log.ts';

export const Random = {
	getArrayElem: <T>(array: T[]): T => {
		return log.withLogger<T>(() => {
			if (!array || array.length === 0) throw Error(`Array doesn't exists: ${array}`);

			return array[Math.floor(Math.random() * array.length)];
		}, 'random');
	},
};
