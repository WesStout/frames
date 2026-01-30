using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;

namespace inputTest.Pages
{
    public class IndexModel : PageModel
    {
        private readonly ILogger<IndexModel> _logger;

        // Use [BindProperty] for properties that should be bound from the form data
        [BindProperty]
        public string Message { get; set; }
        public string file { get; set; }
        public string height { get; set; }
        public string width { get; set; }
        public string startingSpecies { get; set; }

        public IndexModel(ILogger<IndexModel> logger)
        {
            _logger = logger;
        }

        // Handles GET requests (initial page load)
        public void OnGet()
        {
            ViewData["species"] = "olive";
            Message = "Welcome to the index page.";
        }

        // Handles POST requests (form submission)
        public IActionResult OnPost()
        {
            _logger.LogInformation("OnPost() called. Received message: {Message}", Message);
            return RedirectToPage("/Frames/Create");

        }
    }
}
