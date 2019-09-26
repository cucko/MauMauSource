using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Newtonsoft.Json;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace MauMau.Web.Controllers
{
    public class Player
    {
        [JsonProperty(PropertyName = "id")]
        public string Id { get; set; } = "0";
        
        [JsonProperty(PropertyName = "index")]
        public int Index { get; set; } = 0;
        
        [JsonProperty(PropertyName = "name")]
        public string Name { get; set; } = "Bob";
        
        [JsonProperty(PropertyName = "cards")]
        public List<Card> Cards { get; set; } = new List<Card>();

        public Player(string id, int index, string name, List<Card> cards)
        {
            Id = id;
            Index = index;
            Name = name;
            Cards = cards;
        }

        public static List<Card> drawStartupCards(List<Card> drawStack)
        {
            List<Card> cards = new List<Card>();
            for (int i = 0; i < GameConfig.numberOfCardsAtStart; i++)
                cards.Add(Deck.getCardFromDrawStack(drawStack));
            return cards;
        }

    }
}