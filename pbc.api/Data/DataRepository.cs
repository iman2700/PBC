using System;
using System.Globalization;
using System.Security.Cryptography.X509Certificates;
using System.Collections.Generic;
using System.Threading.Tasks;
using pbc.api.Models;
using Microsoft.EntityFrameworkCore;

namespace pbc.api.Data
{
    public class DataRepository : IDataRepository
    {
        private readonly DataContext context;
        public DataRepository(DataContext _context)
        {
            this.context=_context;
        }
        public void Add<T>(T entity) where T : class
        {
             context.Add(entity);
        }

        public void Delete<T>(T entity) where T : class
        {
             context.Remove(entity);
        }

        public async Task<User> GetUser(int id)
        {
            var user=await context.Users.Include(p=>p.Photos).FirstOrDefaultAsync(u=>u.Id==id);
            return user;                                
        }

        public async Task<IEnumerable<User>> GetUsers()
        {
            var user=await context.Users.Include(p=>p.Photos).ToListAsync();
            return user;

        }

        public async Task<bool> SaveAll()
        {
             return await context.SaveChangesAsync() > 0;
        }
        public async Task<Photo> GetPhoto(int id)
        {
           var photo= await context.Photos.FirstOrDefaultAsync(p=>p.Id==id);
           return photo;
        }

    }
}