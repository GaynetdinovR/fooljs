export const CARDS_PATH: string = 'content';

const data = {
	suits: ['Club', 'Diamond', 'Heart', 'Spade'],
	values: ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'Jack', 'Queen', 'King', 'Ace'],
	jokers: [
		{
			'id': 'XR',
			'imgPath': CARDS_PATH + '/XR.png',
			'name': 'Red Joker',
			'color': 'red',
			'power': 13,
			'suit': 'Joker',
		},
		{
			'id': 'XB',
			'imgPath': CARDS_PATH + '/XB.png',
			'name': 'Black Joker',
			'color': 'black',
			'power': 13,
			'suit': 'Joker',
		}
	],
};

export default data;