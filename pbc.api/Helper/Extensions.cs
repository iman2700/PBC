using System.Runtime.CompilerServices;
using System;
using System.Runtime.InteropServices;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Net;
using Microsoft.AspNetCore.Http;

namespace pbc.api.Helper
{
    public static class Extensions
    {
        public static void AddApplicationError(this HttpResponse response,string message)
        {
            response.Headers.Add("Applivation-error",message);
            response.Headers.Add("Access-Control-Expose-Headers","Application-Error");
            response.Headers.Add("Access-Control-Allow-Origin","*");
        }
        public static int CalculateAge(this DateTime theDateTime)
        {
          var age=DateTime.Today.Year - theDateTime.Year;
          if(theDateTime.AddYears(age) > DateTime.Today)
          age-- ;
          return age;
        }
    }
    
}