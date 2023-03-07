using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace APITestingsReact.Models
{
    public class Testing
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Grade { get; set; }
        public string Date { get; set; }
        public string Subject { get; set; }
        public int NumberOfPases { get; set; } = 0;
        public string User { get; set; }
        
        

        
    }
}
