namespace inputTest.Models
{
    public class FrameDto
    {
        public int FrameId { get; set; }
        public string? FileType { get; set; }
        public IFormFile? ImageData { get; set; }
        public double HeightInInches { get; set; }
        public double WidthInInches { get; set; }
        public string? FrameData { get; set; }
        public string? Options { get; set; }

    }
}
