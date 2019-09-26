import { ICard } from "./Card"
import { IPlayer } from "./Player";


export interface IGameState {
    drawStack: Array<ICard>,
    burnedStack: Array<ICard>,
    players: Array<IPlayer>,
    currentPlayer: number,
    turn: number,
    round: number,
    isFinished: boolean,
    isLoading: boolean,
    error: string,
    loggedItems: Array<ILog>,
}

export interface ILog {
    timestamp: Date,
    player: IPlayer | null,
    action: string,
    card: ICard | null
}



// export const logAction = (player: IPlayer, action: string, card: ICard, loggedItems: Array<string>): Array<string> => {
//     console.log(player.name, action, card);
//     return [...loggedItems, `${player.name} ${action} ${card.rank} of ${card.suit}`];
//     // (document.getElementById('logger') as HTMLElement).innerHTML += `${player.name} ${action} ${card.rank} of ${card.suit}`;
// }

export interface KnownAction {
    type: 'DRAW' | 'BURN' | 'RESET' | 'SUCCESS' | 'FETCHING' | 'ERROR';
    card: ICard;
    state?: IGameState;
}


