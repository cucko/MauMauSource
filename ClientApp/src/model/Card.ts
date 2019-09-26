export interface ICard {
    rank: Rank,
    suit: Suit
}

export enum Suit {
    hearts = 'hearts',
    diamonds = 'diamonds',
    clubs = 'clubs',
    spades = 'spades'
}

// returns color and 
export const getCardTypeProps = (type: Suit): ICardTypeProps => {
    switch (type) {
      case Suit.hearts: return { text: '♥', color: 'red' };
      case Suit.diamonds: return { text: '♦️', color: 'red' };
      case Suit.clubs: return { text: '♣', color: 'black' };
      case Suit.spades: return { text: '♠️', color: 'black' };
    }
  }

export enum Rank {
    two = 'two',
    three = 'three',
    four = 'four',
    five = 'five',
    six = 'six',
    seven = 'seven',
    eight = 'eight',
    nine = 'nine',
    ten = 'ten',
    ace = 'ace',
    jack = 'jack',
    queen = 'queen',
    king = 'king',
}

interface IRankLetterMap {
    [key: string]: string
}
export const rankLetterMap: IRankLetterMap = {
    two: '2',
    three: '3',
    four: '4',
    five: '5',
    six: '6',
    seven: '7',
    eight: '8',
    nine: '9',
    ten: '10',  
    ace: 'A',
    jack: 'J',
    queen: 'Q',
    king: 'K'
}

export interface ICardTypeProps {
    text: string
    color: string,
}

export const cardToString = (card:ICard) :string => card.rank + ' of ' + card.suit;
