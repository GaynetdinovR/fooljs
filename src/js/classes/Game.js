import data from '../data/data.js';
import { delay, moveToFallBtnListener, raiseBtnListener } from '../eventListeners.js';
import { bot, player, deck, display, table, other, fall, setDeck, setPlayer, setBot } from '../start.js';
import Deck from './Deck.js';
import Bot from './Bot/Bot.js';
import Player from './Player.js';
import { playerView, view } from './views/views.js';

export default class Game {
    //Количество ходов
    #movesCount = 0;

    /**
     * Возвращает кол-во ходов
     * @returns number
     */
    getMovesCount = () => {
        return this.#movesCount;
    };

    /**
     * Добавляет ход
     */
    #increaseMovesCount = () => {
        this.#movesCount++;
    };

    /**
     * Раздает карты игрокам в начале игры (по одной карте поочередно)
     * @param {*} countToPlayer число карт на игрока / number
     */
    giveCardsToPlayersInit = (countToPlayer) => {
        for (let i = 0; i < countToPlayer * 2; i++) {
            if (i % 2 == 0) {
                bot.addCards(deck.giveCards(1));
                continue;
            }

            player.addCards(deck.giveCards(1));
        }
    };

    /**
     * Раздает карты игрокам после хода(сначала тому кто ходил)
     */
    giveCardsToPlayers = () => {
        const whose_move = localStorage.getItem('whose_move');
        const players = [];

        players[0] = whose_move == 'bot' ? bot : player;
        players[1] = whose_move == 'bot' ? player : bot;

        for (const player of players) {
            if (player.getCards().length < 6) {
                player.addCards(deck.giveCards(6 - player.getCards().length));
            }
        }

        display.update();
    };

    /**
     * Проверяет может ли карта побить другую карту
     * @param {*} cardToDefend {}
     * @param {*} cardToBeat {}
     * @returns bool
     */
    isCardCanBeat = (cardToDefend, cardToBeat) => {
        if (cardToDefend.suit == deck.getTrumpCard().suit) {
            if (cardToBeat.suit == deck.getTrumpCard().suit) {
                if (cardToDefend.power > cardToBeat.power) {
                    return true;
                }
                return false;
            }
            return true;
        }

        if (cardToDefend.suit == cardToBeat.suit && cardToDefend.power > cardToBeat.power) {
            return true;
        }

        return false;
    };

    /**
     * Изменяет ход
     */
    changeWhoseMove = () => {
        let whose_move = localStorage.getItem('whose_move');

        if (whose_move == 'bot') {
            other.notification('Вы атакуете!', 'info');
            localStorage.setItem('whose_move', 'player');
            return;
        }

        other.notification('Бот атакует!', 'info');
        localStorage.setItem('whose_move', 'bot');
    };

    /**
     * Действия при конце хода
     */
    newMoveAction = () => {
        fall.moveToFall(table.giveAllCards());

        this.giveCardsToPlayers();
        this.changeWhoseMove();

        display.update();

        this.#increaseMovesCount();
    };

    /**
     * Действия при атаке игрока
     * @param {*} cardName string
     */
    playerAttack = (cardName) => {
        const chosenCard = player.findCardByName(cardName);

        if (!table.isPossibleToPlaceCardAttack(chosenCard)) return;

        player.addCardToTable(chosenCard);
    };

    /**
     * Действия при защите игрока
     * @param {*} cardName string
     */
    playerDefend = (cardName) => {
        for (const card of player.getCards()) {
            delete card['chosenForAttack'];
        }

        const chosenCard = player.giveCard(player.findCardByName(cardName));

        chosenCard.chosenForAttack = true;

        player.addCard(chosenCard);
    };

    /**
     * Проверяет "хорошая" ли карта
     * Карта "хорошая" если: 1. Ее значение >= 10, 2. Она козырная и ее значение >= 8
     * @param {*} card
     * @returns bool
     */
    isGoodCard = (card) => {
        return card.power >= 10 || (card.suit == this.trumpSuit && card.power >= 8);
    };

    /**
     * Получает фазу игры
     * @returns string
     */
    getGamePhase = () => {
        if (deck.getDeck().length >= 6 && fall.getFall().length <= 15) return '1';

        if (deck.getDeck().length < 6 && fall.getFall().length > 15 && fall.getFall().length <= 32) return '2';

        if (deck.getDeck().length == 0 && fall.getFall().length > 32) return '3';
    };

    /**
     * Действия перед началом игры
     * @param {*} cardsCount number
     * @param {*} mode stupid/easy/normal
     * @param {*} whose_first bot/player
     */
    prestart = (cardsCount, mode, whose_first) => {
        this.setBotsMode(mode);
        this.setCards(cardsCount);
        this.setWhoseFirst(whose_first);

        setDeck(new Deck());
        setBot(new Bot([], deck.getTrumpCard().suit));
        setPlayer(new Player([], deck.getTrumpCard().suit));
    };

    /**
     * Действия после начала игры
     */
    poststart = () => {
        view.hide('menu', 'flex');
        view.show('content', 'block');

        delay(1000).then(() => {
            playerView.playerMoveToFallBtn.addEventListener('click', moveToFallBtnListener);
            playerView.playerRaiseBtn.addEventListener('click', raiseBtnListener);
        });
    };

    /**
     * Действия при перезапуске игры
     */
    reset = () => {
        view.show('menu', 'flex');
        view.hide('content', 'block');

        setDeck(new Deck());
        setBot(new Bot([], deck.getTrumpCard().suit));
        setPlayer(new Player([], deck.getTrumpCard().suit));
    };

    /**
     * Возвращает данные из меню
     * @returns array
     */
    getStartData = () => {
        const mode = document.querySelector('#menu_game-mode').value;
        const cardsCount = document.querySelector('#menu__game-cards-count').value;
        const whose_first = document.querySelector('#menu__game-whose-first').value;

        return [cardsCount, mode, whose_first];
    };

    /**
     * Начинает новую игру
     * @param {*} cardsCount number
     * @param {*} mode stupid/easy/normal
     * @param {*} whose_first bot/player
     */
    startNewGame = (cardsCount, mode, whose_first) => {
        this.prestart(cardsCount, mode, whose_first);

        this.giveCardsToPlayersInit(6);

        display.update();
        display.updateHeader();

        bot.monitorChanges(structuredClone(table.getCards()));

        this.poststart();
    };

    /**
     * Возвращает количество карт
     * @param {*} cardsCount number
     * @returns []
     */
    formatCardsByCardsCount = (cardsCount) => {
        const cardsAll = structuredClone(data.cardsAll);

        const count = {
            12: () => cardsAll.slice(10),
            24: () => cardsAll.slice(7),
            36: () => cardsAll.slice(4),
            52: () => cardsAll,
        };

        return count[cardsCount]();
    };

    /**
     * Устанавливает данные о картах
     * @param {*} cardsCount number
     */
    setCards = (cardsCount) => {
        data.cardsCount = cardsCount;
        data.cards = this.formatCardsByCardsCount(cardsCount);
    };

    /**
     * Устанавливает режим бота
     * @param {*} mode stupid/easy/normal
     */
    setBotsMode = (mode) => {
        data.mode = mode;
    };

    /**
     * Устанавливает кто ходит первый
     * @param {*} whose_first bot/player
     */
    setWhoseFirst = (whose_first) => {
        localStorage.setItem('whose_move', whose_first);
    };
}
