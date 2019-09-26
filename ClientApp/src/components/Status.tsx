import React from "react";
import { IGameState } from "../model/Game";
import { getGameStatus, getTotalCards } from "../methods/GameMethods";


interface Props {
  gameState: IGameState;
}



export function Status(props: Props) {
  return (
    <div className="game-status">
      {getGameStatus(props.gameState)}
      <div className="cards-status">
          Total cards: {getTotalCards(props.gameState)}
        </div>
    </div>

  );
}
