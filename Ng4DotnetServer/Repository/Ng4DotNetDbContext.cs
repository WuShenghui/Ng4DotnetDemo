using Microsoft.Data.Sqlite;
using Microsoft.EntityFrameworkCore;
using Ng4DotnetServer.Models;

namespace Ng4DotnetServer.Repository
{
    public class Ng4DotNetDbContext : DbContext
    {
        public DbSet<Crud> CrudList { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            var connectionStringBuilder = new SqliteConnectionStringBuilder { DataSource = "Ng4DotNet.db" };
            var connectionString = connectionStringBuilder.ToString();
            var connection = new SqliteConnection(connectionString);

            optionsBuilder.UseSqlite(connection);
        }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            builder.Entity<Crud>().HasKey(m => m.Id);
            base.OnModelCreating(builder);
        }
    }
}