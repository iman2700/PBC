using System;
using System.ComponentModel.DataAnnotations;

namespace pbc.api.Dtos
{
    public class UserForRegisterDto
    {
       UserForRegisterDto()
      {
         Created=DateTime.Now;
         LastActive=DateTime.Now;    
      }
         public int Id { get; set; }
        [Required]
        public string UserName { get; set; }
        [Required]
          // [StringLength(8,MinimumLength =4,ErrorMessage ="you must specific passworde")]
        public string Password { get; set; }
        public string Gender { get; set; }
        public string KnowAs { get; set; }
        public DateTime DateOfBirth { get; set; }
        public string City { get; set; }
        public string Country { get; set; }
        public DateTime Created { get; set; }
        public DateTime LastActive { get; set; }

        
    }
}