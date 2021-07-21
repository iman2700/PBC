using System.Reflection.Metadata.Ecma335;
using System;
using System.Text;
using System.Security.Claims;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using pbc.api.Data;
using pbc.api.Dtos;
using pbc.api.Models;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;

namespace pbc.api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    
    public class AuthController:ControllerBase
    {
        private IConfiguration _config;
        private IAuthRepository _repo;
        
        public AuthController(IAuthRepository repo,IConfiguration config)
        {
            _config=config;
            _repo=repo;
        }
        [HttpPost("register")]
        public async Task<IActionResult> Register(UserForRegisterDto userForRegisterDto)
        {
            if(!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
             userForRegisterDto.UserName=userForRegisterDto.UserName.ToLower();
             if (await _repo.UserExists(userForRegisterDto.UserName))
             {
                 return BadRequest("user nanw alredy exist");
             }
             var userToCreate=new User
             {
                 UserName=userForRegisterDto.UserName
             };
             var createUser=await _repo.Register(userToCreate,userForRegisterDto.Password);
             return StatusCode(201);
              
        }
         [HttpPost("login")]
        public async Task<ActionResult> Login(UserForLoginDto userForLoginDto)
        {
            try
            {
                var userFromRepo=await _repo.Login(userForLoginDto.UserName,userForLoginDto.Passwoed);
           
            if(userFromRepo==null)
            {
                return Unauthorized();
            }
            var claims=new []
            {
                new Claim(ClaimTypes.NameIdentifier,userFromRepo.Id.ToString()),
                new Claim(ClaimTypes.Name,userFromRepo.UserName)
            };
            var key=new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_config.GetSection("AppSettings:Token").Value));
            var creds=new SigningCredentials(key,SecurityAlgorithms.HmacSha512Signature);
            var tokenDescriptor=new SecurityTokenDescriptor
            {
              Subject=new ClaimsIdentity(claims),
              Expires= DateTime.Now.AddDays(1),
              SigningCredentials=creds
            };
            var tokenHandler=new JwtSecurityTokenHandler();
            var token=tokenHandler.CreateToken(tokenDescriptor);
            return Ok(new{
                token=tokenHandler.WriteToken(token)
            });
            }
            catch (System.Exception)
            {
               return StatusCode(500,"bad error");
            }
             
            
          
        }
        
    }
}