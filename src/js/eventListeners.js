import { playerView } from './classes/views/views.js';
import { display, player, table, game } from './start.js';

/**
 * Искусственная задержка
 * @param {*} ms number
 * @returns Promise
 */
const delay = async (ms) => await new Promise((resolve) => setTimeout(resolve, ms));

/**
 * Слушатель карт игрока
 * @param {*} e eventObject
 */
const playerCardClickListener = (e) => {
    if (!e.target.alt) return;

    if (localStorage.getItem('whose_move') == 'player') {
        display.isPlayerMoveToFallBtnDisabled(false);
        game.playerAttack(e.target.alt);
        return;
    }

    game.playerDefend(e.target.alt);

    display.update();
};

/**
 * Слушатель кнопки "Бито"
 * @param {*} e eventObject
 */
const moveToFallBtnListener = () => {
    display.isPlayerMoveToFallBtnDisabled(true);

    game.newMoveAction();
};

/**
 * Слушатель кнопки "Поднять"
 * @param {*} e eventObject
 */
const raiseBtnListener = () => {
    display.isPlayerRaiseBtnDisabled(true);
    playerView.resetChosenCard();

    player.raiseTableCards();

    display.update();

    game.giveCardsToPlayers();
};

/**
 * Слушатель карты, от которой защищается игрок
 */
const playerTableCardListener = () => {
    const cardToDefendParent = document.querySelector('.player__card-for-attack');
    if (!cardToDefendParent) return;

    const cardToDefendElem = cardToDefendParent.childNodes[0];
    const cardToDefend = player.giveCard(player.findCardByName(cardToDefendElem.alt));

    delete cardToDefend['chosenForAttack'];
    table.beatCard(cardToDefend);

    display.update();
};

/**
 * Слушатель кнопки "reset"
 */
const resetBtnListener = () => {
    game.reset();
};

/**
 * Слушатель кнопки "Начать"
 */
const startBtnListener = () => {
    game.startNewGame(...game.getStartData());
};

document.querySelector('#game_start').addEventListener('click', startBtnListener);
document.querySelector('#game_reset').addEventListener('click', resetBtnListener);

export { delay, playerCardClickListener, playerTableCardListener, moveToFallBtnListener, raiseBtnListener, startBtnListener, resetBtnListener };
