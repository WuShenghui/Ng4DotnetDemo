using Ng4DotnetServer.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Ng4DotnetServer.Repository
{
    public interface ICrudRepository
    {
        Task<List<Crud>> GetAsync();

        Task<PagingResult<Crud>> GetPageAsync(int skip, int take);

        Task<Crud> GetByIdAsync(int id);

        Task<Crud> InsertAsync(Crud model);

        Task<bool> UpdateAsync(Crud model);

        Task<bool> DeleteAsync(int id);
    }
}