import { cleanup } from '@testing-library/react';
import { numberOfCardsAtStart, playerNames } from '../config/gameConfig';
import { IGameState } from '../model/Game';
import { initializeStartState, getTotalCards } from '../methods/GameMethods';


afterEach(cleanup)

describe('test game methods', () => {
  // initialize game state
  const gameState: IGameState = initializeStartState();
  
  it(`it should create ${playerNames.length} players`, () => {
    expect(gameState.players.length).toEqual(playerNames.length);
  })

  for (let i = 0; i < playerNames.length; i++) {
    it(playerNames[i] + ' should have ' + numberOfCardsAtStart, () => {
      expect(gameState.players[i].cards.length).toEqual(numberOfCardsAtStart)
    })
  }

  it('burned stack should have 1 card', () => {
    expect(gameState.burnedStack.length).toEqual(1);
  })

  it('current turn should be 0', () => {
    expect(gameState.turn).toEqual(0);
  })

  it('current round should be 0', () => {
    expect(gameState.round).toEqual(0);
  })

  it('current player should be greater or equal to 0', () => {
    expect(gameState.currentPlayer).toBeGreaterThanOrEqual(0);
  })

  it('current player should be less or equal to 3', () => {
    expect(gameState.currentPlayer).toBeLessThanOrEqual(3);
  })


  it('total cards should be 52', () => {
    expect(getTotalCards(gameState)).toEqual(52);
  })
})


