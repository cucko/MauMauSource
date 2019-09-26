import React, { Component } from "react";
import { Route } from "react-router-dom";
import "./css/site.scss";

import { Home } from "./components/Home";
import { Layout } from "./components/Layout";
import { Advanced } from "./components/Advanced";
import { Spectator } from "./components/Spectator";
import { Basic } from "./components/Basic";
import { Game } from "./components/Game";
import { TestDeck } from "./components/TestDeck";

export default class App extends Component {
  public render() {
    return (
      <Layout>
        <Route exact={true} path="/" component={Home} />
        <Route path="/test" component={TestDeck} />
        <Route path="/basic" component={Basic} />
        <Route path="/advanced" component={Advanced} />
        <Route path="/game" component={Game} />
        <Route path="/spectator" component={Spectator} />
      </Layout>
    );
  }
}
