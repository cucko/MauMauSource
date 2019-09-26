import { cleanup } from '@testing-library/react';
import * as Reducer from '../reducer/gameReducer';
import { initialGameState, initializeStartState, getCurrentPlayer, getTotalCards } from '../methods/GameMethods';
import { KnownAction, IGameState } from '../model/Game';
import { ICard } from '../model/Card';


afterEach(cleanup)

describe('test the reducer and actions', () => {

  it('should set the error message', () => {
    expect(Reducer.gameReducer(initialGameState, { type: 'ERROR', card: {} as ICard } as KnownAction))
      .toEqual({ ...initialGameState, error: 'Error fetching data from server' })
  })

  it('should remove the error message', () => {
    expect(Reducer.gameReducer(initialGameState, { type: 'SUCCESS', card: {} as ICard, state: {} as IGameState } as KnownAction))
      .toEqual({ ...initialGameState, error: '' })
  })

  it('should burn a card', () => {
    const state = initializeStartState();
    const player = getCurrentPlayer(state);
    const totalCardsCount = getTotalCards(state)
    const card = player.cards[0];
    const burnAction: KnownAction = { type: 'BURN', card: card };
    const newstate = Reducer.gameReducer(state, burnAction);
    expect(newstate.burnedStack)
      .toEqual([...state.burnedStack, burnAction.card])

    expect(player.cards.find(c => c.suit === card.suit && c.rank === card.rank))
      .toEqual(undefined)
    expect(totalCardsCount).toEqual(getTotalCards(newstate));
  })

  it('should draw a card', () => {
    const state = initializeStartState();
    const player = getCurrentPlayer(state);
    const drawStackCount = state.drawStack.length;
    const totalCardsCount = getTotalCards(state)
    const cardCount = player.cards.length;
    const card = state.drawStack[0];
    const drawAction: KnownAction = { type: 'DRAW', card: card };
    const newstate = Reducer.gameReducer(state, drawAction);

    expect(newstate.drawStack.length)
      .toEqual(drawStackCount - 1)

    expect(player.cards.length)
      .toEqual(cardCount + 1)

    expect(totalCardsCount).toEqual(getTotalCards(newstate));
  })

})
