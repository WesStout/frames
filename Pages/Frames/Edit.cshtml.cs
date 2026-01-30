using inputTest.Data;
using inputTest.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using System.Collections;
using System.IO;

namespace inputTest.Pages.Frames
{
    public class EditModel : PageModel
    {
        [BindProperty]
        public FrameDto FrameDto { get; set; } = new FrameDto();

        public Frame Frame { get; set; } = new Frame();

        private readonly ApplicationDbContext _context;
        public EditModel(ApplicationDbContext context)
        {
            _context = context;
        }
        public IActionResult OnGet(int Id)
        {
            var frame = _context.Frames.Find(Id);
            if (frame == null)
            {
                return RedirectToPage("/Paintings/Index");
            }

            // create an IFormFile from the stored byte[] so the DTO can reuse the same shape as the Create page
            IFormFile file = null;
            if (frame.ImageData != null && frame.ImageData.Length > 0)
            {
                var ms = new MemoryStream(frame.ImageData);
                file = new FormFile(ms, 0, frame.ImageData.Length, "data", "upload")
                {
                    Headers = new HeaderDictionary(),
                    ContentType = frame.FileType ?? "application/octet-stream"
                };
            }



            Frame = frame;
            FrameDto.FileType = frame.FileType;
            FrameDto.ImageData = file;
            FrameDto.HeightInInches = frame.HeightInInches;
            FrameDto.WidthInInches = frame.WidthInInches;
            FrameDto.FrameData = frame.FrameData;
            return Page();
        }
    }
}
