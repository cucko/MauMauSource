using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Newtonsoft.Json;

namespace MauMau.Web.Controllers
{
    public class GameState
    {
        [JsonProperty(PropertyName = "drawStack")]
        public List<Card> DrawStack { get; set; } = new List<Card>();

        [JsonProperty(PropertyName = "burnedStack")]
        public List<Card> BurnedStack { get; set; } = new List<Card>();

        [JsonProperty(PropertyName = "players")]
        public List<Player> Players { get; set; } = new List<Player>();

        [JsonProperty(PropertyName = "currentPlayer")]
        public int CurrentPlayer = 0;
        [JsonProperty(PropertyName = "turn")]
        public int Turn = 0;
        [JsonProperty(PropertyName = "round")]
        public int Round = 0;
        [JsonProperty(PropertyName = "loggedItems")]
        public List<Log> LoggedItems { get; set; } = new List<Log>();
        [JsonProperty(PropertyName = "isFinished")]
        public bool IsFinished = false;
        [JsonProperty(PropertyName = "isLoading")]
        public bool IsLoading = false;
        [JsonProperty(PropertyName = "error")]
        public string error = "";

        public static GameState initialize()
        {
            GameState state = new GameState();
            state.DrawStack = Deck.GenerateDeck();
            state.LoggedItems.Add(new Log(null, "Deck is generated and shuffled", null));

            int i = 0;
            GameConfig.playerNames.ForEach(name =>
            {
                Player player = new Player(i.ToString(), i, name, Player.drawStartupCards(state.DrawStack));
                state.Players.Add(player);
                state.LoggedItems.Add(new Log(player, " has been dealt: " + cardsToString(player.Cards), null));
                i++;
            });

            state.BurnedStack.Add(Deck.getCardFromDrawStack(state.DrawStack));
            state.LoggedItems.Add(new Log(null, "Starting game with", state.BurnedStack[0]));

            state.CurrentPlayer = new Random().Next(4);
            state.LoggedItems.Add(new Log(state.Players[state.CurrentPlayer], "starts first", null));
            return state;
        }
        public static string cardsToString(List<Card> cards)
        {
            var cardsStrings = cards.Select(c =>
                (Card.GetDescription((Rank)Enum.Parse(typeof(Rank), c.Rank)) +
                Card.GetDescription((Suit)Enum.Parse(typeof(Suit), c.Suit)))).ToList();
            return String.Join(" ", cardsStrings.ToArray());
        }
    }


    public class Log
    {
        [JsonProperty(PropertyName = "timestamp")]
        DateTime Timestamp { get; set; }
        [JsonProperty(PropertyName = "player")]
        Player Player { get; set; } = null;
        [JsonProperty(PropertyName = "action")]
        string Action { get; set; }
        [JsonProperty(PropertyName = "card")]
        Card Card { get; set; } = null;

        public Log(Player player, string action, Card card)
        {
            Timestamp = DateTime.UtcNow;
            Player = player;
            Action = action;
            Card = card;
        }
    }

}