using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using ProductStore.Server.Dtos;
using ProductStore.Server.Models;
using System.Net;
using System.Security.Claims;
using System.IdentityModel.Tokens.Jwt;
using Microsoft.IdentityModel.Tokens;
using System.Text;

namespace ProductStore.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthenticationController : ControllerBase
    {
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly RoleManager<ApplicationRole> _roleManager;
        private readonly IConfiguration _configuration;

        public AuthenticationController(UserManager<ApplicationUser> userManager, RoleManager<ApplicationRole> roleManager, IConfiguration configuration)
        {
            _userManager = userManager;
            _roleManager = roleManager;
            _configuration = configuration;
        }

        [HttpPost]
        [Route("roles/add")]
        public async Task<IActionResult> CreateRole([FromBody] CreateRoleRequest request)
        {
            var appRole = new ApplicationRole { Name = request.Role };
            var createRole = await _roleManager.CreateAsync(appRole);

            return Ok(new { message = "Role created successfully! " } );
        }

        [HttpPost]
        [Route("register")]
        public async Task<IActionResult> Register([FromBody] RegisterRequest request)
        {
            var result = await RegisterAsync(request);

            return result.Success ? Ok(result) : BadRequest(result.Message);
        }

        private async Task<RegisterResponse> RegisterAsync(RegisterRequest request)
        {
            try
            {
                var userExists = await _userManager.FindByEmailAsync(request.Email);
                if (userExists != null)
                {
                    return new RegisterResponse
                    {
                        Message = "User already exists!",
                        Success = false
                    };
                }

                userExists = new ApplicationUser
                {
                    FullName = request.FullName,
                    Email = request.Email,
                    ConcurrencyStamp = Guid.NewGuid().ToString(),
                    UserName = request.Email,
                };

                var createUserResult = await _userManager.CreateAsync(userExists, request.Password);
                if (!createUserResult.Succeeded)
                {
                    return new RegisterResponse
                    {
                        Message = $"ERROR: Failed to create user!, {createUserResult?.Errors?.First()?.Description}",
                        Success = false
                    };
                }

                var addUserToRoleResult = await _userManager.AddToRoleAsync(userExists, request.Role);
                if (!addUserToRoleResult.Succeeded)
                {
                    return new RegisterResponse
                    {
                        Message = $"The user was created but the user couldn't be added to a role! {addUserToRoleResult?.Errors?.First()?.Description}",
                        Success = false
                    };
                }

                return new RegisterResponse
                {
                    Success = true,
                    Message = $"User has registered successfully! Role: {request.Role.ToString()}"
                };
            }
            catch (Exception ex)
            {
                return new RegisterResponse
                {
                    Message = ex.Message,
                    Success = false
                };
            }
        }

        [HttpPost]
        [Route("login")]
        [ProducesResponseType((int) HttpStatusCode.OK, Type = typeof(RegisterResponse))]
        public async Task<IActionResult> Login([FromBody] LoginRequest request)
        {
            var result = await LoginAsync(request);

            return result.Success ? Ok(result) : BadRequest(result.Message);
        }

        private async Task<LoginResponse> LoginAsync(LoginRequest request)
        {
            try
            {
                var user = await _userManager.FindByEmailAsync(request.Email);
                if (user == null)
                {
                    return new LoginResponse
                    {
                        Message = "Invalid email/password!",
                        Success = false
                    };
                }

                // Password check
                var isPasswordValid = await _userManager.CheckPasswordAsync(user, request.password);
                if (!isPasswordValid)
                {
                    return new LoginResponse
                    {
                        Message = "Invalid email/password!",
                        Success = false
                    };
                }

                // All is well with the login if we manage to reach to this block of code in this method
                var claims = new List<Claim>
                {
                    new Claim(JwtRegisteredClaimNames.Sub, user.Id.ToString()),
                    new Claim(ClaimTypes.Name, user.UserName),
                    new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
                    new Claim(ClaimTypes.NameIdentifier, user.Id.ToString())
                };

                var roles = await _userManager.GetRolesAsync(user);
                var roleClaims = roles.Select(x => new Claim(ClaimTypes.Role, x));
                claims.AddRange(roleClaims);

                var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["JwtConfig:Key"]!));
                var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);
                var expires = DateTime.Now.AddMinutes(30);

                var token = new JwtSecurityToken(
                    issuer: _configuration["JwtConfig:Issuer"],
                    audience: _configuration["JwtConfig:Audience"],
                    claims: claims,
                    expires: expires,
                    signingCredentials: creds);

                return new LoginResponse
                {
                    AccessToken = new JwtSecurityTokenHandler().WriteToken(token),
                    Message = "Login Successful",
                    Email = user?.Email,
                    Success = true,
                    UserID = user?.Id.ToString(),
                    Role = roles.FirstOrDefault()
                };
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.ToString());
                return new LoginResponse
                {
                    Success = false,
                    Message = ex.Message
                };
            }
        }
    }
}
