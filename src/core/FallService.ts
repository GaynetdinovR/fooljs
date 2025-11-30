class FallService implements IFallService {
	static getFallTrumps = (fall, trumpSuit) => {
		return fall.filter(card => card.suit == trumpSuit)
	}
}

export default FallService;