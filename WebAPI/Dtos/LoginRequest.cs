using Microsoft.AspNetCore.Authorization;
using System.ComponentModel.DataAnnotations;

namespace ProductStore.Server.Dtos
{
    public class LoginRequest
    {
        [Required, EmailAddress]
        public string Email { get; set; } = string.Empty;

        [Required, DataType(DataType.Password)]
        public string password { get; set; } = string.Empty;
    }
}
