using System;
using System.Collections.Generic;
using pbc.api.Models;

namespace pbc.api.Dtos
{
    public class UserForListDto
    {
        public int Id { get; set; }
        public string UserName { get; set; }
        public string Gender { get; set; }
        public int Age { get; set; }
        public DateTime Created { get; set; }
        public DateTime LasstActive { get; set; }
        public string City { get; set; }
        public string Country { get; set; }
        public string  Url { get; set; }
        public string PhotoUrl { get; set; } 
        public string KnownAs { get; set; }

       
    }
}