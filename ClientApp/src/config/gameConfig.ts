// if enabled, will send the game state to firebase realtime database
// and to enable Spectator mode
// leave it to false since the Firebase DB Api Secret key is removed from the server code
export const enableServerLog = false;

// enable this to use the dotnet core server for state management
// *** MauController has thread.sleep(3-5sec) to simulate slow server and to show the loading on client ***
export const useServerState = false;

//leave empty if the dotnet core server is on same host:port
export const apiHost = ''; 


export const playerNames = ['Alice', 'Bob', 'Carol', 'Eva'];

export const numberOfCardsAtStart = 7;

export const firebaseConfig = {
  // apiKey: "",  // not needed for client app
  authDomain: "arduinioio.firebaseio.com/",
  databaseURL: "https://arduinioio.firebaseio.com/",
}

// TODO: put this setting in gameState object
let hasCpuPlayers = false;
export const setHasCpuPlayers = (newVal: boolean) => hasCpuPlayers = newVal;
export const getHasCpuPlayers = () => hasCpuPlayers;
