using System;
using System.ComponentModel;
using System.Collections.Generic;
using System.Collections;
using Newtonsoft.Json;
using Newtonsoft.Json.Serialization;
using System.Reflection;
using System.Linq;

namespace MauMau.Web.Controllers
{
    public class Card
    {
        [JsonProperty(PropertyName = "rank")]
        public string Rank { get; set; }
        [JsonProperty(PropertyName = "suit")]
        public string Suit { get; set; }

        public static string GetDescription(Enum GenericEnum)
        {
            Type genericEnumType = GenericEnum.GetType();
            MemberInfo[] memberInfo = genericEnumType.GetMember(GenericEnum.ToString());
            if ((memberInfo != null && memberInfo.Length > 0))
            {
                var _Attribs = memberInfo[0].GetCustomAttributes(typeof(System.ComponentModel.DescriptionAttribute), false);
                if ((_Attribs != null && _Attribs.Count() > 0))
                {
                    return ((System.ComponentModel.DescriptionAttribute)_Attribs.ElementAt(0)).Description;
                }
            }
            return GenericEnum.ToString();
        }

    }

    public enum Suit
    {
        [Description("♥")]
        hearts,
        [Description("♦")]
        diamonds,
        [Description("♠")]
        clubs,
        [Description("♣")]
        spades
    }

    public enum Rank
    {
        [Description("2")]
        two,
        [Description("3")]
        three,
        [Description("4")]
        four,
        [Description("5")]
        five,
        [Description("6")]
        six,
        [Description("7")]
        seven,
        [Description("8")]
        eight,
        [Description("9")]
        nine,
        [Description("10")]
        ten,
        [Description("A")]
        ace,
        [Description("J")]
        jack,
        [Description("Q")]
        queen,
        [Description("K")]
        king
    }


}