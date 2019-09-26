import { ICard } from "../model/Card"
import { IPlayer } from "../model/Player";
import { generateDeck, initializeFirstBurnedCard } from "./DeckMethods";
import { ILog, IGameState } from "../model/Game";
import { createPlayers } from "./PlayerMethods";
import { playerNames, apiHost, enableServerLog } from "../config/gameConfig";

export const createLogItem = (player: IPlayer | null, action: string, card: ICard | null): ILog => ({
    timestamp: new Date(), 
    player,
    action,
    card
})

const createLogItemInfo = (action: string) => createLogItem(null, action, null);

export const initializeStartState = (): IGameState => {
    const initDeck = generateDeck();
    const loggedItems = [createLogItemInfo('Deck is generated and shuffled')];
    const players = createPlayers(playerNames, initDeck, loggedItems);
    const burnedStack = initializeFirstBurnedCard(initDeck);

    loggedItems.push(createLogItem(null, `Starting game with`, burnedStack[0]));

    loggedItems.push(createLogItemInfo(`First card is ${burnedStack[0].rank} of ${burnedStack[0].suit}`));

    const currentPlayer = Math.floor(Math.random() * playerNames.length);
    loggedItems.push(createLogItem(players[currentPlayer], `starts first`, null));

    return {
        drawStack: initDeck,
        players: players,
        burnedStack: burnedStack,
        currentPlayer: currentPlayer,
        turn: 0,
        round: 0,
        loggedItems: loggedItems,
        isFinished: false,
        isLoading: false,
        error: ''
    }
}

export const initialGameState: IGameState = {
    burnedStack: [] as Array<ICard>,
    drawStack: [] as Array<ICard>,
    players: [] as Array<IPlayer>,
    turn: 0,
    round: 0,
    currentPlayer: 0,
    isFinished: true,
    loggedItems: [],
    isLoading: false,
    error: ''
};

export const resetServerState = () => {
    if (!enableServerLog)
        return;
    fetch(`${apiHost}/api/Mau/Reset`)
        .then(response => response.json())
        .then((e) => {
            console.log(e);
        })
        .catch(e => {
            throw(e);
        });
}
export const updateServerState = (state: IGameState) => {
    if (!enableServerLog)
        return;
    fetch(`${apiHost}/api/Mau/UpdateState`, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(state)
    })
        .catch(e => {
            throw(e);
        });
}

export const getLastCardInBurnedStack = (cards: Array<ICard>): ICard => {
    if (cards.length > 0)
        return cards[cards.length - 1];
    else throw (new Error('There is no card in burned stack.'));
}

export const getTotalCards = (state: IGameState): number => {
    let total = state.drawStack.length + state.burnedStack.length;
    state.players.forEach(player => total += player.cards.length);
    return total;
}

export const getGameStatus = (state: IGameState): string => {
    if (state.drawStack.length === 0 && state.players.length > 0) {
        return 'No more cards in Draw Stack';
    } else if (state.isFinished && state.players.length > 0) {
        let status = 'Finished.';
        state.players.forEach(p => {
            if (!p.cards || p.cards.length === 0) {
                status = `${p.name} Wins this Game`;
            }
        });
        return status;
    } else if (state.players.length > 0) {
        return `${getCurrentPlayer(state).name}'s turn`;
    } else return '';
}

export const getLastActionType = (state: IGameState) => {
    if (state.loggedItems && state.loggedItems.length > 0)
        return state.loggedItems[state.loggedItems.length - 1].action;
    else return "";
}

export const getCurrentPlayer = (state: IGameState) => state.players[state.currentPlayer];