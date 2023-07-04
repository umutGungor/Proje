using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Login3.Models
{
    public class User
    {
        public int id { get; set; }

        public String firstLast { get; set; }
        public String email { get; set; }
        public string sk { get; set; }
        public int ls { get; set; }
        public String pass { get; set; }
        public DateTime since { get; set; }

    }
}
