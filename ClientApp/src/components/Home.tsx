import React, { useState, useEffect } from 'react';
import { withRouter, RouteComponentProps } from 'react-router';
import { initializeStartState } from '../methods/GameMethods';
import { Card } from './Card';
import { Link } from 'react-router-dom';
import ReactGA from 'react-ga';


export const Home = withRouter((props: RouteComponentProps<{}>) => {

  const [gameState, set_gameState] = useState(initializeStartState());

  const getRotationZ = (i: number, n: number) => (30 / (n - 1)) * i - 15;

  const reinitialize = () => set_gameState(initializeStartState());

  useEffect(() => {
    ReactGA.pageview(window.location.pathname + window.location.search);
  }, []);

  return (
    <div id="game-table">
      <h1>Mau Mau</h1>
      <h5>in ReactJs &amp; dotnet Core</h5>
      <h3>by Gorancho Sirkarovski</h3>
      <br />
      <div className="button-group">
        <Link to='/test'>Deck Test</Link>
        <br />
        <Link to='basic'>Basic Demo</Link>
        <Link to='/advanced' >Advanced Demo</Link>
        <br />
        <Link to='/game'>Play Game</Link>
        <br />
        <Link to='/spectator' className="button">Spectator</Link>

        <div className="intro-cards">
          {gameState.players[0].cards.map((c, i) =>
            <Card card={c} key={c.rank + c.suit} rotate={getRotationZ(i, gameState.players[0].cards.length)} />
          )}
        </div>
        <button onClick={reinitialize} >Draw Cards</button>

      </div>
    </div>
  )
})

