import { cleanup } from '@testing-library/react';
import { numberOfCardsAtStart } from '../config/gameConfig';
import { createPlayer } from '../methods/PlayerMethods';
import { generateDeck } from '../methods/DeckMethods';


afterEach(cleanup)

describe('test player methods', () => {
  const deck = generateDeck();
  const player = createPlayer(0, 'Player1', deck);

  it('player should have ' + numberOfCardsAtStart, () => {
    expect(player.cards.length).toEqual(numberOfCardsAtStart)
  })


  it('total cards should be 52', () => {
    expect(player.cards.length + deck.length).toEqual(52)
  })
})


