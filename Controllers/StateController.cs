using System;
using System.Threading;
using System.Web;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Firebase.Database;
using Firebase.Database.Query;
using Newtonsoft.Json;

using System.Diagnostics;
using Microsoft.AspNetCore.Http;

// game state management controller / reduced
namespace MauMau.Web.Controllers
{
    //[ApiController]
    [Route("api/[controller]")]
    public class StateController : Controller
    {
        static FirebaseClient firebase;
        const string GAME_STATE = "game_state";

        [HttpGet("[action]")]
        public async Task<string> Reset()
        {
            if (firebase == null)
                firebase = GameConfig.GetFirebaseClient();
            await firebase
                .Child("maumau")
               .DeleteAsync();
            var serialized_state = JsonConvert.SerializeObject(GameState.initialize());
            HttpContext.Session.SetString(GAME_STATE, serialized_state);
            return serialized_state;
        }

        [HttpGet("[action]")]
        public JsonResult Burn(Card card)
        {
            GameState state = JsonConvert.DeserializeObject<GameState>(HttpContext.Session.GetString(GAME_STATE));
            Player player = state.Players[state.CurrentPlayer];
            // check if the player has the card
            if (player.Cards.Where(c => c.Suit == card.Suit && c.Rank == card.Rank).Count() == 0)
            {
                state.error = player.Name + "doesn't have ${cardToString(card)}";
                return Json(state);
            }

            // remove the card from player's cards
            player.Cards = player.Cards.Where(c => !(c.Suit == card.Suit && c.Rank == card.Rank)).ToList();
            // add the card to burned stack
            state.BurnedStack.Add(card);
            // add entry to log
            state.LoggedItems.Add(new Log(state.Players[state.CurrentPlayer], player.Cards.Count > 0 ? "burned" : "won with", card));
            // do the turn
            state.CurrentPlayer = (state.CurrentPlayer + 1) % 4;
            state.Turn++;
            state.Round = ((state.Turn + 1) % state.Players.Count) + 1;
            // check if player doesn't have any cards left
            state.IsFinished = player.Cards.Count == 0;
            // save state
            var serialized_state = JsonConvert.SerializeObject(state);
            HttpContext.Session.SetString(GAME_STATE, serialized_state);
            // simulate .5s / 3.5s request
            Random rnd = new Random();
            Thread.Sleep(1000 * rnd.Next(1) + 500);
            return Json(state);
        }

        [HttpGet("[action]")]
        public JsonResult Draw(Card card)
        {
            GameState state = JsonConvert.DeserializeObject<GameState>(HttpContext.Session.GetString(GAME_STATE));

            Player player = state.Players[state.CurrentPlayer];
            // remove the card from draw stack
            state.DrawStack.RemoveAt(0);
            // add the card to player's cards
            player.Cards.Add(card);
            // add entry to log
            state.LoggedItems.Add(new Log(state.Players[state.CurrentPlayer], "drew", card));
            // do turn
            state.CurrentPlayer = (state.CurrentPlayer + 1) % 4;
            state.Turn++;
            state.Round = ((state.Turn + 1) % state.Players.Count) + 1;
            // check if there are no more cards in draw stack
            state.IsFinished = state.DrawStack.Count == 0;
            // save state
            var serialized_state = JsonConvert.SerializeObject(state);
            HttpContext.Session.SetString(GAME_STATE, serialized_state);
            // simulate .5s / 3.5s request
            Random rnd = new Random();
            Thread.Sleep(1000 * rnd.Next(3) + 500);
            return Json(state);
        }
    }


}
