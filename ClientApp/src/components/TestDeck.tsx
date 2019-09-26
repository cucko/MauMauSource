import React, { useState, useEffect } from 'react';
import { Card } from './Card';
import { generateDeck } from '../methods/DeckMethods';
import { withRouter, RouteComponentProps } from 'react-router';
import { Header } from './Header';


export const TestDeck = withRouter((props: RouteComponentProps<{}>) => {

  const [cards, set_cards] = useState(generateDeck(false));

  const onGenerateDeck = () => set_cards(generateDeck(false));

  useEffect(() => {
    const getRandomCard = (): HTMLElement => {
      const cards = document.querySelectorAll('.deck-card');
      return cards[Math.floor(Math.random() * cards.length)] as HTMLElement;
    }


    const interval = setInterval(() => {
      const c = getRandomCard();
      c.classList.add('hover');
      setTimeout(() => {
        c.classList.remove('hover');
      }, 2500);
    }, 200);

    return () => clearInterval(interval);
  }, [cards])

  return (
    <div>
      <Header autoPlay={false} delay={2000} onGenerateDeck={onGenerateDeck}>
        <button onClick={onGenerateDeck} >Generate and Shuffle</button>
      </Header>

      <div className="deck-test">
        {cards.map(c =>
          <Card key={c.rank + c.suit} card={c} />
        )}
      </div>
    </div>
  )
})

