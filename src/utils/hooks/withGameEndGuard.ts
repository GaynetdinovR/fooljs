export const withGameEndGuard = (
	fn: () => void,
	endGameActions: () => void,
	isGameEnd: () => boolean
) => {
	if (isGameEnd()) {
		return endGameActions();
	}

	return fn()
}