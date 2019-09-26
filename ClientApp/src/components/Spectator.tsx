import React, { useEffect, useState } from "react";
import * as Firebase from 'firebase/app';
import 'firebase/database';
import { firebaseConfig } from "../config/gameConfig";
import { IGameState } from "../model/Game";
import { Header } from "./Header";
import { Player } from "./Player";
import { Card } from "./Card";
import { initialGameState, getLastCardInBurnedStack, getGameStatus } from "../methods/GameMethods";
import { Log } from "./Log";

export const Spectator = () => {

    const [gameState, set_gameState] = useState(initialGameState)
    useEffect(() => {
        if (Firebase.apps && !Firebase.apps.length)
            Firebase.initializeApp(firebaseConfig);
        Firebase.database().ref('/maumau').on('child_added', snapshot => {
            // Firebase does not return props for empty children, we reinitialize
            const val = snapshot.val() as IGameState;
            val.players = val.players || [];
            val.burnedStack = val.burnedStack || [];
            val.drawStack = val.drawStack || [];
            val.loggedItems = val.loggedItems || [];
            val.loggedItems = val.loggedItems.map(item => ({ ...item, timestamp: new Date(item.timestamp) }));
            set_gameState(val as IGameState);
        })
        return () => {
            Firebase.database().ref('/').off('child_added');
        }
    }, []);

    return <div><header>
        <h1>Mau Mau in ReactJS</h1>
    </header>
        <div id="game">
            <Header autoPlay={false} delay={2000}>&nbsp;</Header>

            <div id="game-table">

                {gameState.burnedStack.length > 0 && gameState.players.map(player => (
                    <Player currentCard={getLastCardInBurnedStack(gameState.burnedStack)} selected={gameState.currentPlayer === player.index} key={`player-${player.id}`} player={player} />
                ))}

                {gameState.drawStack.length > 0 && <div className="draw-stack">
                    <div>Draw Stack<label>({gameState.drawStack.length} cards)</label></div>
                    <Card card={gameState.drawStack[0]} />
                </div>}

                {gameState.burnedStack.length > 0 && <div className="burned-stack">
                    <div>Burned Stack<label>({gameState.burnedStack.length} cards)</label></div>
                    <Card card={getLastCardInBurnedStack(gameState.burnedStack)} />
                </div>}

                {gameState.error && <div id="error">
                    {gameState.error}
                </div>}

                <Log loggedItems={gameState.loggedItems} />

                <div className="game-status">
                    {getGameStatus(gameState)}
                </div>

            </div>
        </div></div>
}
