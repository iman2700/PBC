using System.Linq;
using System.Collections;
using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc;
using pbc.api.Data;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;

namespace pbc.api.Controllers
{ 
 
[Route("[controller]")]
[ApiController]
    public class ValuesController : ControllerBase
                
    {
        private readonly DataContext _context;
        public ValuesController(DataContext context)
        {
            _context = context;
        }                            
        [HttpGet]
        public async Task<IActionResult> Get()
        {
        var values= await _context.Values.ToListAsync();
        return Ok(values);
        }
        [HttpGet("{id}")]
        public async Task<IActionResult> Get(int id)
        {
            var value=await _context.Values.FirstOrDefaultAsync(x=>x.Id==id);
            return Ok(value);
        }
  }
    
}