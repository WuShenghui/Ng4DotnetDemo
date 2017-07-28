using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Ng4DotnetServer.Models;
using Ng4DotnetServer.Repository;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Ng4DotnetServer.Controllers
{
    [Route("api/[controller]")]
    public class CrudController : Controller
    {
        private ICrudRepository _crudRepository;
        private ILogger _logger;

        public CrudController(ICrudRepository crudRepository, ILoggerFactory loggerFactory)
        {
            _crudRepository = crudRepository;
            _logger = loggerFactory.CreateLogger(nameof(CrudController)); ;
        }

        // GET api/crud
        [HttpGet]
        [ProducesResponseType(typeof(List<Crud>), 200)]
        public async Task<ActionResult> Get()
        {
            try
            {
                var crudList = await _crudRepository.GetAsync();
                return Ok(crudList);
            }
            catch (Exception exp)
            {
                _logger.LogError(exp.Message);
                return BadRequest(new { Status = false });
            }
        }

        // GET api/crud/page?skip=10&take=10
        [HttpGet("page")]
        [ProducesResponseType(typeof(List<Crud>), 200)]
        public async Task<ActionResult> GetPage([FromQuery]int skip, [FromQuery]int take)
        {
            try
            {
                var pagingResult = await _crudRepository.GetPageAsync(skip, take);
                return Ok(pagingResult);

                //Response.Headers.Add("X-InlineCount", pagingResult.TotalCount.ToString());
                //return Ok(pagingResult.Items);
            }
            catch (Exception exp)
            {
                _logger.LogError(exp.Message);
                return BadRequest(new { Status = false });
            }
        }

        // GET api/crud/5
        [HttpGet("{id}")]
        [ProducesResponseType(typeof(Crud), 200)]
        public async Task<ActionResult> GetById(int id)
        {
            try
            {
                var customer = await _crudRepository.GetByIdAsync(id);
                return Ok(customer);
            }
            catch (Exception exp)
            {
                _logger.LogError(exp.Message);
                return BadRequest(new { Status = false });
            }
        }

        // POST api/crud
        [HttpPost]
        //[ValidateAntiForgeryToken]
        public async Task<ActionResult> Create([FromBody]Crud model)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(new { Status = false, ModelState = ModelState });
            }

            try
            {
                var newModel = await _crudRepository.InsertAsync(model);
                if (newModel == null)
                {
                    return BadRequest(new { Status = false });
                }
                return CreatedAtRoute("GetCrudRoute", new { id = newModel.Id },
                        new { Status = true, Model = newModel });
            }
            catch (Exception exp)
            {
                _logger.LogError(exp.Message);
                return BadRequest(new { Status = false });
            }
        }

        // PUT api/crud/5
        [HttpPut("{id}")]
        //[ValidateAntiForgeryToken]
        public async Task<ActionResult> Update(int id, [FromBody]Crud model)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(new { Status = false, ModelState = ModelState });
            }

            try
            {
                var status = await _crudRepository.UpdateAsync(model);
                if (!status)
                {
                    return BadRequest(new { Status = false });
                }
                return Ok(new { Status = true, Model = model });
            }
            catch (Exception exp)
            {
                _logger.LogError(exp.Message);
                return BadRequest(new { Status = false });
            }
        }

        // DELETE api/crud/5
        [HttpDelete("{id}")]
        //[ValidateAntiForgeryToken]
        public async Task<ActionResult> Delete(int id)
        {
            try
            {
                var status = await _crudRepository.DeleteAsync(id);
                if (!status)
                {
                    return BadRequest(new { Status = false });
                }
                return Ok(new { Status = true });
            }
            catch (Exception exp)
            {
                _logger.LogError(exp.Message);
                return BadRequest(new { Status = false });
            }
        }
    }
}