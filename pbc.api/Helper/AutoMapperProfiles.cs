using System.Linq;
using System.Reflection.Metadata.Ecma335;
using System.Runtime.InteropServices;
using System.ComponentModel;
using System.Reflection.Metadata;
using AutoMapper;
using pbc.api.Dtos;
using pbc.api.Models;

namespace pbc.api.Helper
{
    public class AutoMapperProfiles:Profile
    {
        public AutoMapperProfiles()
        {
            CreateMap<User,UserForListDto>()
            .ForMember(dest => dest.PhotoUrl, opt=> opt.MapFrom(src=> src.Photos.FirstOrDefault(p=>p.IsMain).Url))
            .ForMember(dest => dest.Age, opt=> opt.MapFrom(src=> src.Created.CalculateAge()));
            CreateMap<User,UserForDetailedDto>()
            .ForMember(dest => dest.PhotoUrl, opt=> opt.MapFrom(src=> src.Photos.FirstOrDefault(p=>p.IsMain).Url))
            .ForMember(dest => dest.Age, opt=> opt.MapFrom(src=> src.Created.CalculateAge()));;
            CreateMap<Photo,PhotoForDetailedDto>();
            CreateMap<Photo,PhotoForReturnDto>();
            CreateMap<PhotoForCreationDto,Photo>();
            CreateMap<UserForUpdateDto,User>();
        }
    }
}