import type { AiModeType, BotGameData, Card as CardType } from '@/types/GameTypes.ts';
import type { TableCardPair } from '@/types/store/TableStoreType.ts';
import { TableCardObjectsPair } from '@/types/core/ITableService.ts';

export type IBotAttackService = {
	attack: (aiMode: AiModeType, gameData: BotGameData) => CardType | undefined,
	findPossibleAttackMoves: (hand: CardType[], table: TableCardObjectsPair[], humanHandCount: number) => CardType[],
	foolAttack: (possibleMoves: CardType[], gameData: BotGameData) => CardType | undefined,
	easyAttack: (possibleMoves: CardType[], gameData: BotGameData) => CardType | undefined,
	mediumAttack: (possibleMoves: CardType[], gameData: BotGameData) => CardType | undefined,
}

