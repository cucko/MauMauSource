import { ICard, rankLetterMap, getCardTypeProps } from "../model/Card";
import { getCardFromDrawStack } from "./DeckMethods";
import { IPlayer } from "../model/Player";
import { numberOfCardsAtStart, getHasCpuPlayers } from "../config/gameConfig"; 
import { ILog } from "../model/Game";
import { createLogItem } from "./GameMethods";

export const createPlayers = (names: Array<string>, drawStack: Array<ICard>, loggedItems: Array<ILog>): Array<IPlayer> => {
    const players = new Array<IPlayer>();
    names.forEach((name, i) => {
        const player = createPlayer(i, name, drawStack, getHasCpuPlayers() && i > 0);
        players.push(player);

        loggedItems.push(createLogItem(player, ` has been dealt: ` + player.cards.map(c =>
            (rankLetterMap[c.rank] + getCardTypeProps(c.suit).text)
        ).join(' '), null))
    })
    return players;
}

export const drawStartupCards = (drawStack: Array<ICard>) => {
    const cards = new Array<ICard>();
    for (let index = 0; index < numberOfCardsAtStart; index++) {
        // if there are no more cards return
        const drawed = getCardFromDrawStack(drawStack);
        if (!drawed)
            break;
        else {
            cards.push(drawed);
            drawStack.splice(0, 1);
        }
    }
    return cards;
}

export const createPlayer = (i: number, name: string, drawStack: Array<ICard>, cpu = false): IPlayer => (
    {
        id: i.toString(),
        index: i,
        name: name,
        cards: drawStartupCards(drawStack),
        cpu: cpu
    }
)

export const findPlayableCard = (currentCard: ICard, playerCards: Array<ICard>): ICard | undefined => {
    return playerCards.find(pc => pc.suit === currentCard.suit || pc.rank === currentCard.rank);
}