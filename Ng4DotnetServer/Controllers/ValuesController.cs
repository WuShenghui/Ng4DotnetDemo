using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;

namespace Ng4DotnetServer.Controllers
{
    [Route("api/[controller]")]
    public class ValuesController : Controller
    {
        [HttpGet("byQueryParams")]
        public IEnumerable<string> GetByQueryParams(QueryInput input)
        {
            return new string[] { "query value1", "query value2" };
        }

        [HttpGet("{value1}/{value2}")]
        public IEnumerable<string> GetByParams(string value1, string value2)
        {
            return new string[] { "value1", "value2" };
        }

        // GET api/values
        [HttpGet]
        public IEnumerable<string> Get()
        {
            return new string[] { "value1", "value2" };
        }

        // GET api/values/5
        [HttpGet("{id}")]
        public string Get(int id)
        {
            return "value";
        }

        // POST api/values
        [HttpPost]
        public void Post([FromBody]string value)
        {
        }

        // PUT api/values/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody]string value)
        {
        }

        // DELETE api/values/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }

        public class QueryInput
        {
            public string Value1 { get; set; }
            public string Value2 { get; set; }
        }
    }
}