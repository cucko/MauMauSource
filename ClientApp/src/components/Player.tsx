import * as React from 'react';
import { IPlayer } from '../model/Player';
import { ICard } from '../model/Card';
import { Card } from './Card';

interface Props {
    currentCard: ICard,
    selected: boolean,
    player: IPlayer,
    onCardSelected?: (card: ICard) => void;
    onDrawCardFromPile?: () => void;
}

export function Player(props: Props) {

    const isPlayable = (card: ICard) => {
        if (card.rank === props.currentCard.rank || card.suit === props.currentCard.suit)
            return "";
        else
            return "disabled";
    }
    const { cards } = props.player;
    return <div className={`player player-${props.player.id} ${props.selected ? 'selected' : ''} ${(!cards || cards.length === 0) ? 'success' : ''}`}>
        <div className="header">{props.player.name}</div>
        <div className="cards">
            {cards && cards.map(card => <Card hide={props.player.cpu} onCardSelected={() => props.onCardSelected && props.onCardSelected(card)} className={isPlayable(card)} key={`${card.rank} ${card.suit}`} card={card} />)}
        </div>
        {cards && cards.length === 1 && <div className="warning">Only one card left</div>}
        {(!cards || cards.length === 0) && <div className="success">Winner</div>}
    </div>;
}