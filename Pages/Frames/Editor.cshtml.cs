using inputTest.Data;
using inputTest.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using Microsoft.EntityFrameworkCore;
using System.Collections;
using System.Diagnostics;
using System.IO;

namespace inputTest.Pages.Frames
{
    public class EditorModel : PageModel
    {
        [BindProperty]
        public FrameDto FrameDto { get; set; } = new FrameDto();

        public Frame Frame { get; set; } = new Frame();

        private readonly ApplicationDbContext _context;
        public EditorModel(ApplicationDbContext context)
        {
            _context = context;
        }
        public IActionResult OnGet(int Id)
        {
            var frame = _context.Frames.Find(Id);
            if (frame == null)
            {
                return RedirectToPage("/Frames/Index");
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
            ViewData["heightInInches"] = frame.HeightInInches;
            ViewData["widthInInches"] = frame.WidthInInches;
            ViewData["frameData"] = frame.FrameData;
            ViewData["species"] = "walnut";
            ViewData["Id"] = Id;
            return Page();
        }


        public async Task<IActionResult> OnPostAsync()
        {
            var existingFrame = await _context.Frames.FindAsync(FrameDto.FrameId);
            if (existingFrame == null)
            {
                return NotFound();
            }
            existingFrame.HeightInInches = FrameDto.HeightInInches;
            existingFrame.WidthInInches = FrameDto.WidthInInches;
            existingFrame.FrameData = FrameDto.FrameData;
            existingFrame.LastModified = DateTime.UtcNow;

            await _context.SaveChangesAsync();
            return new JsonResult(new { success = true, message = "Data received successfully!" });
        }
    }
}
