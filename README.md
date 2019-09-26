# MauMau Source
Source code for http://cucko.github.io/MauMau/

Implementation of simple cards game Mau Mau written in ReactJs and dotnet core.

Run **'dotnet build'** root folder, to build the solution and get npm dependencies.

After build run **'dotnet run'**, to start the dotnet core server and react SPA app

View app on http://localhost:5000

- **Test Deck** - generates, shuffle, and renders all cards in deck with some nice animation

- **Basic Demo** - runs the game with 4 human players, Start **Manual** or **Automatic** game, for manual **1 turn** makes one turn for the current player (if the player has a card to play he burns it, else he draw new from the stack), **AutoPlay** will automatically do turns after initial 2 sec delay. Delay can be changed.

- **Advanced Demo** - runs the same simulation as Basic, visualized
- **Play Game** - play against 3 CPU players, CPU players and next card in DrawStack are hidden.
- **Spectator** - only works if you set gameConfig.enableServerLog=true, and setup a firebase realtime database. If you start Basic/Advanced/Game mode, after each turn, the state is sent to Firebase DB. Here, you can realtime watch the game.
