using System.Runtime.Serialization;
using System.Xml.Serialization;


namespace App.Core.Models {

    [DataContract]
    public class GameModel {

        [DataMember]
        public int Id { get; set; }

        [DataMember]
        public string Name { get; set; }

        [DataMember]
        public string Platform { get; set; }

        [DataMember]
        public double? Year { get; set; }

        [DataMember]
        public string Genre { get; set; }

        [DataMember]
        public string Publisher { get; set; }

        [DataMember]
        public double? NA_Sales { get; set; }

        [DataMember]
        public double? EU_Sales { get; set; }

        [DataMember]
        public double? JP_Sales { get; set; }

        [DataMember]
        public double? Other_Sales { get; set; }

        [DataMember]
        public double? Global_Sales { get; set; }

        [DataMember]
        public double? Critic_Score { get; set; }

        [DataMember]
        public double? Critic_Count { get; set; }

        [DataMember]
        public string User_Score { get; set; }

        [DataMember]
        public double? User_Count { get; set; }

        [DataMember]
        public string Developer { get; set; }

        [DataMember]
        public string Rating { get; set; }
    }


}

