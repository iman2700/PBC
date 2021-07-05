using System.Threading.Tasks;
using pbc.api.Models;

namespace pbc.api.Data
{
    public interface IAuthRepository
    {
         Task<User> Register(User user,string passwoed);
         Task<User> Login(string username,string passwoed);
         Task<bool> UserExists(string username);
    }
}