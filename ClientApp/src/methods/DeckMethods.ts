import { ICard, Rank, Suit } from "../model/Card"
import { resetServerState } from "./GameMethods";

export const generateDeck = (resetFirebaseState = true): Array<ICard> => {
  let deck = new Array<ICard>();
  
  if (resetFirebaseState)
    resetServerState();

  for (const suit in Suit) {
    if (isNaN(Number(suit))) {
      for (const rank in Rank) {
        if (isNaN(Number(rank))) {
          deck.push({ rank: rank as Rank, suit: suit as Suit });
        }
      }
    }
  }
  deck = shuffleCards(deck);
  return deck;
}

export const shuffleCards = (array: Array<ICard>) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

export const initializeFirstBurnedCard = (drawStack: Array<ICard>): Array<ICard> => {
  const card = getCardFromDrawStack(drawStack);
  drawStack.splice(0, 1);
  if (!card) {
    alert('Cannot draw the starting card.');
    throw (new Error('Cannot draw the starting card.'));
  }
  else return [card];
}

export const getCardFromDrawStack = (remaining: Array<ICard>): ICard | null => {
  if (remaining.length > 0)
    return remaining[0];//.splice(0, 1)[0];
  else return null;
}


