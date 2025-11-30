import type IRandom from '@/types/utils/IRandom.ts';
import log from '@/utils/log.ts';

class Random implements IRandom {
	static getArrayElem = <T>(array: T[]): T | null => {
		return log.withLogger<T>(() => {
			if(!array) throw Error(`Array doesn't exists: ${array}`);

			return array[Math.floor(Math.random() * array.length)]
		}, 'random')
	}
}

export default Random;