import { KnownAction, IGameState } from "../model/Game";
import { ICard, cardToString } from "../model/Card";
import { apiHost } from "../config/gameConfig";
import { initializeStartState, createLogItem, getCurrentPlayer, updateServerState } from "../methods/GameMethods";


export const gameReducer = (state: IGameState, action: KnownAction): IGameState => {
    const player = getCurrentPlayer(state);
    const { card } = action;
    switch (action.type) {
        case 'BURN':
            // check if the player has the card
            if (!player.cards.find(c => c === card))
                return {
                    ...state,
                    error: `${player.name} doesn't have ${cardToString(card)}`
                }
            // do the turn
            player.cards = player.cards.filter(c => c !== card);
            // notify if one card left
            const logItemsToAdd = [];
            if (player.cards.length === 1)
                logItemsToAdd.push(createLogItem(player, `has only one card left`, player.cards[0]))
            const newstateBurn = {
                ...state,
                players: state.players,
                burnedStack: [...state.burnedStack, card], // add card to burned stack
                loggedItems: [...state.loggedItems, createLogItem(player, player.cards.length > 0 ? `burned` : `won with`, card), ...logItemsToAdd],
                currentPlayer: player.cards.length === 0 ? state.currentPlayer : (state.currentPlayer + 1) % 4,
                turn: player.cards.length === 0 ? state.turn : state.turn + 1,
                round: player.cards.length === 0 ? state.round : ((state.turn + 1) % state.players.length) + 1,
                isFinished: player.cards.length === 0
            };
            updateServerState(newstateBurn);
            return newstateBurn;
        case 'DRAW':
            if (!state.drawStack.find(c => c === card))
                return {
                    ...state,
                    error: `Draw Stack doesn't have ${cardToString(card)}`
                }
            else
                state.drawStack.splice(0, 1); // remove the first card from draw stack
            // do the turn
            player.cards.push(action.card);
            const newstateDraw = {
                ...state,
                players: [...state.players],
                drawStack: state.drawStack, // no need to splice the array, getCardFromDrawStack already modified the array
                loggedItems: [...state.loggedItems, createLogItem(player, `drew`, card)],
                currentPlayer: (state.currentPlayer + 1) % 4,
                turn: state.turn + 1,
                round: ((state.turn + 1) % state.players.length) + 1,
                isFinished: state.drawStack.length === 0
            };
            updateServerState(newstateDraw);
            return newstateDraw;
        case 'RESET':
            return initializeStartState();

        // Actions for State updates from SERVER  
        case 'ERROR':
            return {
                ...state,
                error: 'Error fetching data from server'
            }
        case 'FETCHING':
            return {
                ...state,
                isLoading: true
            }
        case 'SUCCESS':
            return {
                ...state,
                ...action.state,
                isLoading: false
            }

        default:
            return state;
    }
}

export const gameReducerApiWrapper = (dispatch: React.Dispatch<KnownAction>, state: IGameState, action: KnownAction) => {
    dispatch({ type: 'FETCHING', card: {} as ICard });
    try {
        fetch(`${apiHost}/api/State/${action.type.toLowerCase()}?suit=${action.card.suit}&rank=${action.card.rank}`)
            .then(response => response.json())
            .then((newstate: IGameState) => {
                newstate.loggedItems = newstate.loggedItems.map(item => ({ ...item, timestamp: new Date(item.timestamp) }));
                dispatch({ type: 'SUCCESS', card: {} as ICard, state: { ...state, ...newstate } });
            })
            .catch(e => {
                dispatch({ type: 'ERROR', card: {} as ICard });
            });

    } catch (e) {
        dispatch({ type: 'ERROR', card: {} as ICard });
    }
}

