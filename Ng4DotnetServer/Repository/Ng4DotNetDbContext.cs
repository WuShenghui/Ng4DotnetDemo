using Microsoft.Data.Sqlite;
using Microsoft.EntityFrameworkCore;
using Ng4DotnetServer.Models;

namespace Ng4DotnetServer.Repository
{
    public class Ng4DotNetDbContext : DbContext
    {
        public DbSet<Crud> CrudList { get; set; }

        public Ng4DotNetDbContext(DbContextOptions<Ng4DotNetDbContext> options) : base(options) { }
        
        protected override void OnModelCreating(ModelBuilder builder)
        {
            builder.Entity<Crud>().HasKey(m => m.Id);
            base.OnModelCreating(builder);
        }
    }
}