using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Firebase.Database;
using Firebase.Database.Query;
using Newtonsoft.Json;

using System.Diagnostics;  
using Microsoft.AspNetCore.Http;  

// resets the state on start game or sends the current state to firebase dabatase
namespace MauMau.Web.Controllers
{
    //[ApiController]
    [Route("api/[controller]")]
    public class MauController : Controller
    {
        static FirebaseClient firebase;
        [HttpGet("[action]")]
        public async Task<JsonResult> Reset()
        {
            if (firebase == null)
                firebase = GameConfig.GetFirebaseClient();
            await firebase
                .Child("maumau")
               .DeleteAsync();
            return Json(new { Status = "Success" });
        }

        [HttpPost("[action]")]
        public async Task<IActionResult> UpdateState([FromBody]object state)
        {
            if (firebase == null)
                firebase = GameConfig.GetFirebaseClient();
            
            var entry = await firebase
                .Child("maumau")
                .PostAsync(JsonConvert.SerializeObject(state, Newtonsoft.Json.Formatting.None).ToString());

            return Json(entry.Key);
        }
        
        [HttpGet("[action]")]
        public string Test()
        {
            return "Test";
        }
    }


}
