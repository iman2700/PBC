
using System.Collections.Generic;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using pbc.api.Data;
using pbc.api.Dtos;
 
namespace pbc.api.Controllers
{
    [Authorize]
    [Route("api/[controller]")]  
    [ApiController]
      public class UserController : ControllerBase
    {
        private readonly  IDataRepository _repo;
        private readonly IMapper _mapper;

        public UserController(IDataRepository repo,IMapper  mapper)
        {
            this._repo = repo;
            this._mapper = mapper;
        }
        [HttpGet("getuser")]
        public async Task<IActionResult> GetUser()
        {
            var users=await _repo.GetUsers();
            var userToReturn=_mapper.Map<IEnumerable<UserForListDto>>(users);
            return Ok(userToReturn); 
        }
         [HttpGet("getuser/{id}")]
         public async Task<IActionResult> GetUser(int id)
        {
            var users=await _repo.GetUser(id);
            var userToReturn=_mapper.Map<UserForDetailedDto>(users);
            return Ok(userToReturn); 
        }
    }
}