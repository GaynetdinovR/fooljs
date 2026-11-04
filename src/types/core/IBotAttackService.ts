import type { AiModeType, BotGameData, Card as CardType } from '@/types/GameTypes.ts';
import { TableCardObjectsPair } from '@/types/core/ITableService.ts';

export type IBotAttackService = {
	attack: (aiMode: AiModeType, gameData: BotGameData) => CardType | undefined,
	findPossibleAttackMoves: (hand: CardType[], table: TableCardObjectsPair[], opponentHandCount: number) => CardType[],
	foolAttack: (possibleMoves: CardType[]) => CardType | undefined,
	easyAttack: (possibleMoves: CardType[], gameData: BotGameData) => CardType | undefined,
	mediumAttack: (possibleMoves: CardType[], gameData: BotGameData) => CardType | undefined,
}

