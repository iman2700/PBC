using System.Runtime;
using System.IO;
using System.Security.Claims;
using System.Reflection.Metadata;
using AutoMapper;
using CloudinaryDotNet;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using pbc.api.Data;
using pbc.api.Helper;
using CloudinaryDotNet.Actions;
using pbc.api.Models;
using System.Linq;
using System.Threading.Tasks;
using pbc.api.Dtos;

namespace pbc.api.Controllers
{
    [Authorize]
    [Route("api/users/{userId}/photos")]
    [ApiController]
    public class PhotosController : ControllerBase
    {
        private readonly IOptions<CloudinarySettings> _cloudinaryConfig;

        public IDataRepository _repo { get; set; }
        public IMapper _mapper { get; set; }
         public Cloudinary _cloudinary { get; set; }
        public PhotosController(IDataRepository repo, IMapper mapper, IOptions<CloudinarySettings> cloudinaryConfig)
        {
            _mapper = mapper;
            _cloudinaryConfig = cloudinaryConfig;
            _repo = repo;
            Account acc=new Account(
                _cloudinaryConfig.Value.CloudName,
                _cloudinaryConfig.Value.ApiKey,
                _cloudinaryConfig.Value.ApiSecret
            );
            _cloudinary=new Cloudinary(acc);
        }
        [HttpGet("{id}", Name= "GetPhoto")]
        public async Task<IActionResult> GetPhoto(int id)
        {
            var photoFromRepo=await _repo.GetPhoto(id);
            var photo=_mapper.Map<PhotoForReturnDto>(photoFromRepo);
            return Ok(photo);

        }
        [HttpPost]
        public async Task<IActionResult> AddPotoForUser(int userId,[FromForm]PhotoForCreationDto photoForCreationDto)
        {
           if(userId != int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value))
           {
               return Unauthorized();
           }
           var userFromRepo=await _repo.GetUser(userId);
           var file=photoForCreationDto.File;
           var uplodResult= new ImageUploadResult();
           if(file.Length > 0)
           {
               using (var stream=file.OpenReadStream())
               {
                   var uploadParams=new ImageUploadParams()
                   {
                       File=new FileDescription(file.Name,stream),
                       Transformation=new Transformation().Width(500).Height(500).Crop("fill").Gravity("face")
                   };
                   uplodResult=_cloudinary.Upload(uploadParams);
                }
           }
           photoForCreationDto.Url=uplodResult.Uri.ToString();
           photoForCreationDto.PublicId=uplodResult.PublicId;
           var photo=_mapper.Map<Photo>(photoForCreationDto);
           if(!userFromRepo.Photos.Any(u => u.IsMain))
           {
             photo.IsMain=true;
           }
           userFromRepo.Photos.Add(photo);
            if(await _repo.SaveAll())
           {
               var photoToReturn=_mapper.Map<PhotoForReturnDto>(photo);
               return CreatedAtRoute("GetPhoto",new {id=photo.Id},photoToReturn);
           }
           return BadRequest("Could not add the photo");

        }
    }
}