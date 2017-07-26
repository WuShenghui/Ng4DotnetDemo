using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using Ng4DotnetServer.Models;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Ng4DotnetServer.Repository
{
    public class Ng4DotNetDbSeeder
    {
        private readonly ILogger _Logger;

        public Ng4DotNetDbSeeder(ILoggerFactory loggerFactory)
        {
            _Logger = loggerFactory.CreateLogger("Ng4DotNetDbSeederLogger");
        }

        public async Task SeedAsync(IServiceProvider serviceProvider)
        {
            //Based on EF team's example at https://github.com/aspnet/MusicStore/blob/dev/samples/MusicStore/Models/SampleData.cs
            using (var serviceScope = serviceProvider.GetRequiredService<IServiceScopeFactory>().CreateScope())
            {
                var dbContext = serviceScope.ServiceProvider.GetService<Ng4DotNetDbContext>();
                if (await dbContext.Database.EnsureCreatedAsync())
                {
                    if (!await dbContext.CrudList.AnyAsync())
                    {
                        await InsertCrudSampleData(dbContext);
                    }
                }
            }
        }

        public async Task InsertCrudSampleData(Ng4DotNetDbContext db)
        {

            var crudList = GetCrudList();
            db.CrudList.AddRange(crudList);

            try
            {
                int numAffected = await db.SaveChangesAsync();
                _Logger.LogInformation($"Saved {numAffected} crudList");
            }
            catch (Exception exp)
            {
                _Logger.LogError($"Error in {nameof(Ng4DotNetDbSeeder)}: " + exp.Message);
                throw;
            }
        }

        private List<Crud> GetCrudList()
        {
            return new List<Crud>
            {
                new Crud{ Id = 1, Activated = false, Content="Test Content 1", Count = 3.22, Date = DateTime.Now, Email="test@email.com", Languages = "en-us" , Type = 0},
                new Crud{ Id = 2, Activated = false, Content="Test Content 2", Count = 3.22, Date = DateTime.Now, Email="test@email.com", Languages = "en-us" , Type = 1},
                new Crud{ Id = 3, Activated = false, Content="Test Content 3", Count = 3.22, Date = DateTime.Now, Email="test@email.com", Languages = "en-us" , Type = 0},
                new Crud{ Id = 4, Activated = false, Content="Test Content 4", Count = 3.22, Date = DateTime.Now, Email="test@email.com", Languages = "en-us", Type = 0},
            };
        }
    }
}