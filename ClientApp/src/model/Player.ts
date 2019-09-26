import { ICard } from "./Card";

export interface IPlayer {
    id: string,
    index: number,
    name: string,
    cards: Array<ICard>,
    cpu: boolean,
}

