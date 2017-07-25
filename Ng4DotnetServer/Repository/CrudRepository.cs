using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using Ng4DotnetServer.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Ng4DotnetServer.Repository
{
    public class CrudRepository : ICrudRepository
    {
        private readonly Ng4DotNetDbContext _context;

        private readonly ILogger _logger;

        public CrudRepository(Ng4DotNetDbContext context, ILoggerFactory loggerFactory)
        {
            _context = context;
            _logger = loggerFactory.CreateLogger("CrudRepository");
        }

        public async Task<List<Crud>> GetAsync()
        {
            return await _context.CrudList.OrderBy(c => c.Id)
                                 .Include(c => c.Languages).ToListAsync();
        }

        public async Task<Crud> GetByIdAsync(int id)
        {
            return await _context.CrudList
                                 .Include(c => c.Id)
                                 .SingleOrDefaultAsync(c => c.Id == id);
        }

        public async Task<PagingResult<Crud>> GetPageAsync(int skip, int take)
        {
            var totalRecords = await _context.CrudList.CountAsync();
            var items = await _context.CrudList
                                 .OrderBy(c => c.Id)
                                 .Include(c => c.Languages)
                                 .Skip(skip)
                                 .Take(take)
                                 .ToListAsync();
            return new PagingResult<Crud>(items, totalRecords);
        }

        public async Task<Crud> InsertAsync(Crud model)
        {
            _context.Add(model);
            try
            {
                await _context.SaveChangesAsync();
            }
            catch (System.Exception exp)
            {
                _logger.LogError($"Error in {nameof(InsertAsync)}: " + exp.Message);
            }

            return model;
        }

        public async Task<bool> UpdateAsync(Crud model)
        {
            //Will update all properties of the Customer
            _context.CrudList.Attach(model);
            _context.Entry(model).State = EntityState.Modified;
            try
            {
                return (await _context.SaveChangesAsync() > 0 ? true : false);
            }
            catch (Exception exp)
            {
                _logger.LogError($"Error in {nameof(UpdateAsync)}: " + exp.Message);
            }
            return false;
        }

        public async Task<bool> DeleteAsync(int id)
        {
            var item = await GetByIdAsync(id);
            _context.Remove(item);
            try
            {
                return (await _context.SaveChangesAsync() > 0 ? true : false);
            }
            catch (System.Exception exp)
            {
                _logger.LogError($"Error in {nameof(DeleteAsync)}: " + exp.Message);
            }
            return false;
        }
    }
}