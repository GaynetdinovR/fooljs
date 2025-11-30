import styles from '@/styles/modules/Menu.module.sass';
import { aiModeLocal, gameModeLocal, gameResultsLocal } from '@/data/localization.ts';
import useGameLogic from '@/hooks/useGameLogic.ts';
import { useSettings, useStats } from '@/stores/gameStore.ts';
import { useEffect, useState } from 'react';
import type { GameSettings, Players } from '@/types/GameTypes.ts';
import classNames from 'classnames';
import { PLAYERS } from '../../../../allAnimationsStuff/constants.ts';

const Stats = () => {
	const stats = useStats();

	const color = PLAYERS.includes(stats.result) ? 'green' : 'grey'

	if(stats.settings === null) return null;

	return (
		<div className={classNames(styles.menu__game_data, styles.menu__stats)}>
			<span className={styles.menu__game_data_span} style={{color: color}}> Победитель </span>
			<span className={styles.menu__game_data_span} style={{color: color}}> {gameResultsLocal[stats.result]} </span>
			<span className={styles.menu__game_data_span}> Режим </span>
			<span className={styles.menu__game_data_span}> {gameModeLocal[stats.settings.gameMode]} </span>
			<span className={styles.menu__game_data_span}> Сложность ИИ </span>
			<span className={styles.menu__game_data_span}> {aiModeLocal[stats.settings.aiMode]} </span>
			<span className={styles.menu__game_data_span}> Количество карт </span>
			<span className={styles.menu__game_data_span}> {stats.settings.cardsCount} </span>
		</div>
	);
};

export default Stats;