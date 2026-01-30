using inputTest.Data;
using inputTest.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using System.Diagnostics;
using System.IO;
using System.Threading.Tasks;
using static System.Runtime.InteropServices.JavaScript.JSType;

namespace inputTest.Pages.Frames
{
    public class CreateModel : PageModel
    {
        [BindProperty]
        public FrameDto FrameDto { get; set; } = new();

        private readonly UserManager<IdentityUser> _userManager;
        private readonly ApplicationDbContext _context;
        public CreateModel(UserManager<IdentityUser> userManager, 
            ApplicationDbContext context)
        {
            _userManager = userManager;
            _context = context;
        }
        
        public IActionResult OnGet()
        {
            ViewData["species"] = "walnut";
            return Page();
        }

        public async Task<IActionResult> OnPostAsync()
        {
            byte[] fileBytes = Array.Empty<byte>();
            if (FrameDto.ImageData != null && FrameDto.ImageData.Length > 0)
            {
                using var ms = new MemoryStream();
                await FrameDto.ImageData.CopyToAsync(ms);
                fileBytes = ms.ToArray();
            }
            var frame = new Frame
            {
                CreatedBy = _userManager.GetUserId(User),
                FileType = FrameDto.ImageData?.ContentType ?? FrameDto.FileType,
                ImageData = fileBytes,
                HeightInInches = FrameDto.HeightInInches,
                WidthInInches = FrameDto.WidthInInches,
                FrameData = FrameDto.FrameData,
                CreatedOn = DateTime.UtcNow,
                LastModified = DateTime.UtcNow,
                Options = FrameDto.Options
            };
            _context.Frames.Add(frame);
            await _context.SaveChangesAsync();
            return new JsonResult(new { success = true, message = "Data received successfully!" });
        }
    }
}
