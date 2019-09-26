import React, { useEffect, useReducer, useState } from 'react';
import { getCardFromDrawStack } from '../methods/DeckMethods';
import { Player } from './Player';
import { ICard } from '../model/Card';
import { KnownAction } from '../model/Game';
import { Header } from './Header';
import { initialGameState, getLastCardInBurnedStack, getLastActionType, getCurrentPlayer } from '../methods/GameMethods';
import { findPlayableCard } from '../methods/PlayerMethods';
import { gameReducer, gameReducerApiWrapper } from '../reducer/gameReducer';
import { Log } from './Log';
import { Status } from './Status';
import { Stack } from './Stack';
import { useServerState, setHasCpuPlayers } from '../config/gameConfig';
import { Loading } from './Loading';

export const Advanced = () => {
  setHasCpuPlayers(false);

  const [autoPlay, set_autoPlay] = useState(true);
  const [delay, set_delay] = useState(2000);


  const [gameState, dispatch] = useReducer(gameReducer, initialGameState);

  const onStartGame = (enabled: boolean) => {
    set_autoPlay(enabled)
    dispatchWrapper({ type: 'RESET', card: {} as ICard });
  }

  const dispatchWrapper = (action: KnownAction) => {
    if (useServerState)
      gameReducerApiWrapper(dispatch, gameState, action);
    else
      dispatch(action);
  }

  useEffect(() => {
    let timeout: NodeJS.Timeout;
    if (autoPlay) {
      timeout = setTimeout(() => {
        if (gameState.burnedStack.length && gameState.drawStack.length && !gameState.isFinished && !gameState.isLoading)
          (document.getElementById('doTurn') as HTMLElement).click(); // doTurn();
      }, delay);
    }

    return () => {
      if (timeout) {
        clearTimeout(timeout);
      }
    }
  }, [gameState, autoPlay, delay]);


  const doTurn = () => {
    const player = getCurrentPlayer(gameState);
    const playableCard = findPlayableCard(getLastCardInBurnedStack(gameState.burnedStack), player.cards);
    if (playableCard)
      onCardSelected(playableCard);
    else
      onDrawCardFromPile();
  }


  const onCardSelected = (card: ICard) => {
    dispatchWrapper({ type: 'BURN', card: card });
  }


  const onDrawCardFromPile = () => {
    if (gameState.isFinished)
      return;
    const drawedCard = getCardFromDrawStack(gameState.drawStack);
    if (!drawedCard) {
      alert('No more cards in pile.');
      return;
    }
    dispatchWrapper({ type: 'DRAW', card: drawedCard });
  }

  const onNextTurn = () => {
    if (!gameState.isLoading && !gameState.error)
      doTurn();
  }

  const toggleAutoplay = (enabled: boolean) => {
    set_autoPlay(enabled);
    if (enabled && !gameState.isLoading && !gameState.error)
      doTurn();
  }

  const onDelayChange = (e: React.ChangeEvent<HTMLInputElement>) => set_delay(parseInt(e.target.value));

  return (
    <div id="game">
      <Header showStartButtons={gameState.burnedStack.length === 0 || gameState.isFinished} autoPlay={autoPlay}
        toggleAutoplay={toggleAutoplay} onDelayChange={onDelayChange} onStartGame={onStartGame} onNextTurn={onNextTurn} delay={delay} />

      <div id="game-table" className={gameState.isLoading ? 'loading' : ''}>
        {gameState.burnedStack.length > 0 && gameState.players.map(player => (
          <Player currentCard={getLastCardInBurnedStack(gameState.burnedStack)} selected={gameState.currentPlayer === player.index} key={`player-${player.id}`} player={player} onCardSelected={card => onCardSelected(card)} onDrawCardFromPile={onDrawCardFromPile} />
        ))}

        <Stack cards={gameState.drawStack} onCardSelected={onDrawCardFromPile} lastActionType={getLastActionType(gameState)} type="Draw" />

        <Stack cards={gameState.burnedStack} lastActionType={getLastActionType(gameState)} type="Burned" />

        <Log loggedItems={gameState.loggedItems} />

        <div className="progress">
          Loading...
          <Loading />
        </div>

        {gameState.error && <div id="error">
          {gameState.error}
        </div>}

        <Status gameState={gameState} />
      </div>
    </div>
  );
}
