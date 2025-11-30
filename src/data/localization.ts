export const aiModeLocal = {
	'random': 'Случайная',
	'fool': 'Очень легкая',
	'easy': 'Легкая',
	'medium': 'Средняя',
	'hard': 'Сложная',
	'extreme': 'Невозможная',
} as const;

export const gameModeLocal = {
	'throw-in': 'Подкидной',
	'with passing': 'Переводной',
} as const;

export const playersLocal = {
	'bot': 'Бот',
	'human': 'Игрок'
} as const;

export const gameResultsLocal = {
	'none': 'Ошибка',
	'draw': 'Ничья',
	'human': 'Игрок',
	'bot': 'ИИ',
}