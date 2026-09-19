import type { AiModeType, BotGameData, Card as CardType } from '@/types/GameTypes.ts';
import type { TableCardPair } from '@/types/store/TableStoreType.ts';

export type IBotAttackService = {
	attack: (aiMode: AiModeType, gameData: BotGameData) => CardType | undefined,
	findPossibleAttackMoves: (hand: CardType[], table: TableCardPair[], humanHandCount: number) => CardType[],
	foolAttack: (possibleMoves: CardType[], gameData: BotGameData) => CardType | undefined,
	easyAttack: (possibleMoves: CardType[], gameData: BotGameData) => CardType | undefined,
}

