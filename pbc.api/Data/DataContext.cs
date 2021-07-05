using Microsoft.EntityFrameworkCore;
using pbc.api.Models;

namespace pbc.api.Data
{
    public class DataContext : DbContext
    {
        public DataContext(DbContextOptions<DataContext> options) : base(options) {}     
     
        public DbSet<Value> Values{get;set;}
        public DbSet<User> Users { get; set; }
    }
}