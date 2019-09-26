import React, { ReactNode, useEffect } from "react";
import { withRouter, RouteComponentProps } from "react-router";
import { getHasCpuPlayers } from "../config/gameConfig";
import ReactGA from 'react-ga';

interface InnerProps {
  onStartGame?: (automatic: boolean) => void;
  toggleAutoplay?: (automatic: boolean) => void;
  onNextTurn?: () => void;
  autoPlay: boolean;
  delay: number;
  showStartButtons?: boolean;
  onGenerateDeck?: () => void;
  onDelayChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  children?: ReactNode
}


type Props = InnerProps & RouteComponentProps<{}>;
export const Header = withRouter((props: Props) => {

  useEffect(()=>{
    ReactGA.pageview(window.location.pathname + window.location.search);
  },[]);

  const startGameButtons = () => {
    if (getHasCpuPlayers())
      return <div>
        <button onClick={() => props.onStartGame && props.onStartGame(true)}>Start</button>
      </div>;
    else
      return <div>
        <button onClick={() => props.onStartGame && props.onStartGame(false)}>Manual</button>
        <button onClick={() => props.onStartGame && props.onStartGame(true)}>Auto</button>
      </div>;
  }

  const inGameButtons = () => {
    if (props.autoPlay) {
      return !getHasCpuPlayers() ?
        <div>
          <button onClick={props.onNextTurn} id="doTurn" hidden>1 Turn</button>
          <button onClick={() => props.toggleAutoplay && props.toggleAutoplay(false)}>Pause</button>
        </div>
        : <button onClick={props.onNextTurn} id="doTurn" hidden>1 Turn</button>;
    }
    else {
      return <div>
        <button onClick={props.onNextTurn} id="doTurn">1 Turn</button>
        <button onClick={() => props.toggleAutoplay && props.toggleAutoplay(true)}>Continue</button>
      </div>;
    }
  }

  const type = props.location.pathname.substr(1);

  const onHomeClick = () => props.history.goBack();

  return <header>
    <h1 onClick={onHomeClick}>
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M0 0h24v24H0z" fill="none" /><path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z" /></svg>
      <span>{`Mau Mau ${type}`}</span></h1>
    <div className="actions">
      <div className="home-buttons">
        {props.children ? props.children :
          (props.showStartButtons === true ?
            startGameButtons() :
            inGameButtons()
          )}
        {props.autoPlay && <div className="autoPlayOptions">
          <div className="autoPlayValue">Delay: <strong>{props.delay}</strong>ms</div>
          <input type="range" max="5000" step="10" min="30" value={props.delay} onChange={props.onDelayChange} />
        </div>}
      </div>
    </div>

  </header>
})
