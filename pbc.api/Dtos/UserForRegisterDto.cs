using System.ComponentModel.DataAnnotations;

namespace pbc.api.Dtos
{
    public class UserForRegisterDto
    {
         public int Id { get; set; }
        [Required]
        public string UserName { get; set; }
        [Required]
          [StringLength(8,MinimumLength =4,ErrorMessage ="you must specific passworde")]
        public string Password { get; set; }
        
    }
}