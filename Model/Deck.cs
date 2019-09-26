using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MauMau.Web.Controllers
{
    public class Deck
    {
        public static List<Card> GenerateDeck()
        {
            var deck = new List<Card>();
            foreach (Suit suit in Enum.GetValues(typeof(Suit)))
            {
                foreach (Rank rank in Enum.GetValues(typeof(Rank)))
                {
                    deck.Add(new Card(){ Rank = rank.ToString(), Suit = suit.ToString() });
                }
            }
            return Shuffle(deck);
        }

        public static List<T> Shuffle<T>(List<T> list)
        {
            Random rnd = new Random();
            for (int i = 0; i < list.Count; i++)
            {
                int k = rnd.Next(0, i);
                T value = list[k];
                list[k] = list[i];
                list[i] = value;
            }
            return list;
        }

        public static Card getCardFromDrawStack(List<Card> remaining)
        {
            if (remaining.Count > 0)
            {
                Card card = remaining[0];
                remaining.RemoveAt(0);
                return card;
            }
            else throw new Exception("No cards in Draw stack");
        }

    }
}
