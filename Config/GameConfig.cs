using System.Threading;
using System.Threading.Tasks;
using System.Collections.Generic;
using Firebase.Database;
using Firebase.Database.Query;

namespace MauMau.Web.Controllers
{
    public class GameConfig
    {
        public static List<string> playerNames = new List<string>() { "Alice", "Bob", "Carol", "Eva" };
        public static int numberOfCardsAtStart = 7;

        public static FirebaseClient GetFirebaseClient()
        {
            string auth = ""; // your app secret - REMOVED
            string dbUrl = "https://arduinioio.firebaseio.com/";

            FirebaseClient firebase = new FirebaseClient(dbUrl, new FirebaseOptions
            {
                AuthTokenAsyncFactory = () => Task.FromResult(auth)
            });
            return firebase;
        }


    }
}

