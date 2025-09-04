import type { Card } from '@/types/GameTypes.ts';

interface IDeckService {
	bundleDeck(): Card[];

	shuffleDeck(deck: Card[]): Card[];
}

export default IDeckService;