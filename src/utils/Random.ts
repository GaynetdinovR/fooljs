import logger from '@/utils/logger.ts';
import type IRandom from '@/types/utils/IRandom.ts';

class Random implements IRandom {
	static getArrayElem = <T>(array: T[]): T => {
		if(array.length === 0) return logger.error('Array can\'t be empty');

		return array[Math.floor(Math.random() * array.length)]
	}
}

export default Random;