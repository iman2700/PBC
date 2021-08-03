using System.Security.Cryptography;
using System;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using pbc.api.Models;

namespace pbc.api.Data
{
    public class AuthRepository : IAuthRepository
    {
        private readonly DataContext context;
        public AuthRepository(DataContext context)
        {
            this.context = context;

        }
        public async Task<User> Login(string username, string passwoed)
        {
            var user = await context.Users.FirstOrDefaultAsync(x => x.UserName == username);
          
            if (user == null)
            {
                return null;
            }
            if (!VerifyPasswordHash(passwoed, user.PasswordHash, user.PasswordSalt))
                return null;

            return user;
        }

        private bool VerifyPasswordHash(string passwoed, byte[] passwordHash, byte[] passwordSalt)
        {
            using (var hmac = new System.Security.Cryptography.HMACSHA512(passwordSalt))
            {
                var computedHash = hmac.ComputeHash(System.Text.Encoding.UTF8.GetBytes(passwoed));
                for (int i = 0; i < computedHash.Length; i++)
                {
                    if (computedHash[i] != passwordHash[i])
                        return false;
                }
            }
            return true;
        }

        public async Task<User> Register(User user, string passwoed)
        {
            byte[] passwoedHash, passwordSalt = null;
            CreatePasswoedHash(passwoed, out passwoedHash, out passwordSalt);
            user.PasswordHash = passwoedHash;
            user.PasswordSalt = passwordSalt;
            await context.Users.AddAsync(user);
            await context.SaveChangesAsync();
            return user;

        }
        public void CreatePasswoedHash(string password, out byte[] passwoedHash, out byte[] passwordSalt)
        {
            using (var hmac = new System.Security.Cryptography.HMACSHA512())
            {
                passwordSalt = hmac.Key;
                passwoedHash = hmac.ComputeHash(System.Text.Encoding.UTF8.GetBytes(password));
            }
        }

        public async Task<bool> UserExists(string username)
        {
           if(await context.Users.AnyAsync(x=>x.UserName==username))
             return true;

            return false;   
        }
    }
}