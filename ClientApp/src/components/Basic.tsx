import React, { useEffect, useReducer, useRef, useState } from 'react';
import { getCardFromDrawStack } from '../methods/DeckMethods';
import { ICard } from '../model/Card';
import { KnownAction } from '../model/Game';
import { Header } from './Header';
import { initialGameState, getLastCardInBurnedStack, getCurrentPlayer } from '../methods/GameMethods';
import { findPlayableCard } from '../methods/PlayerMethods';
import { gameReducer, gameReducerApiWrapper } from '../reducer/gameReducer';
import { Status } from './Status';
import { Log } from './Log';
import { useServerState, setHasCpuPlayers } from '../config/gameConfig';
import { Loading } from './Loading';

export const Basic = () => {
  setHasCpuPlayers(false);

  const logger = useRef<HTMLDivElement>(null);

  const [autoPlay, set_autoPlay] = useState(true);
  const [delay, set_delay] = useState(2000);

  // let timeout: NodeJS.Timeout;
  // let timeoutRef = useRef<NodeJS.Timeout>(null);

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
    const timeout = setTimeout(() => {
      if (gameState.burnedStack.length && gameState.drawStack.length && !gameState.isFinished && !gameState.isLoading)
        if (autoPlay)
          (document.getElementById('doTurn') as HTMLElement).click();  // doTurn();
    }, delay);

    if (logger && logger.current)
      logger.current.scrollTop = logger.current.scrollHeight;

    return () => {
      if (timeout)
        clearTimeout(timeout);
    }
  }, [gameState, delay, autoPlay]);


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
    // else
    // timeout && clearTimeout(timeout);
  }

  const onDelayChange = (e: React.ChangeEvent<HTMLInputElement>) => set_delay(parseInt(e.target.value));

  return (
    <div id="game-simple">
      <Header showStartButtons={gameState.burnedStack.length === 0 || gameState.isFinished} autoPlay={autoPlay}
        toggleAutoplay={toggleAutoplay} onDelayChange={onDelayChange} onStartGame={onStartGame} onNextTurn={onNextTurn} delay={delay} >

      </Header>

      <div id="game-table" className={gameState.isLoading ? 'loading' : ''}>
        <Status gameState={gameState} />
        <Log loggedItems={gameState.loggedItems} />
        {gameState.error && <div id="error">
          {gameState.error}
        </div>}
        <div className="progress">
          Loading...
          <Loading />
        </div>

      </div>
    </div>
  );
}
