import type { TableCardPair } from '../../src/types/store/TableStoreType';

export const isTableBeatenByIds = (table: TableCardPair[]) => table.every(([, defendId]) => defendId !== null);