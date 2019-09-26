import React from "react";
import { ICard } from "../model/Card";
import { getLastCardInBurnedStack } from "../methods/GameMethods";
import { Card } from "./Card";
import { getHasCpuPlayers } from "../config/gameConfig";


interface Props {
  type: 'Draw' | 'Burned';
  cards: Array<ICard> | null;
  lastActionType: string;
  onCardSelected?: () => void;
}


export function Stack(props: Props) {
  
  const { cards, lastActionType, onCardSelected, type } = props;

  const getClassName = (): string => {
    if (type === 'Draw')
      return lastActionType === 'drew' ? 'selected' : ''
    else
      return lastActionType === 'burned' ? 'selected' : ''
  }
  
  if (!cards || cards.length === 0)
    return null;
  else {
    // If there are cards in stack, get first to Draw or last in Burned
    const card = type === 'Draw' ? cards[0] : getLastCardInBurnedStack(cards);
    return (<div className={`${getClassName()} ${type.toLowerCase()}-stack`} onClick={onCardSelected}>
      <div>{type} Stack<label>({cards.length} cards)</label></div>
      <Card card={card} hide={getHasCpuPlayers() && type === 'Draw'} />
    </div>);
  }
}
