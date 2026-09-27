type ICardClassifcationService = {}

const CardClassifcationService: ICardClassifcationService = {
	/**
	 * Классификация карт(разная при 24/36/52 колоде):
	 * При 52 колоде:
	 * 2-6 - мелкие
	 * 7-10 - средние
	 * валет-туз - крупные
	 * При 36 колоде:
	 * 6-8 - мелкие
	 * 9-валет - средние
	 * дама-туз - крупные
	 * При 24 колоде:
	 * 9-10 - мелкие
	 * валет-дама - средние
	 * король-туз - крупные
	 * Общие правила: козыри > обычные карты
	 */
}

export default CardClassifcationService;