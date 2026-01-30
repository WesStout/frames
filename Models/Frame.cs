namespace inputTest.Models
{
    public class Frame
    {
        public int FrameId { get; set; }
        public string? FileType { get; set; }
        public byte[]? ImageData { get; set; }
        public double HeightInInches { get; set; }
        public double WidthInInches { get; set; }
        public string? FrameData { get; set; }
        public string? CreatedBy { get; set; }
        public DateTime CreatedOn { get; set; }
        public DateTime LastModified { get; set; }
        public string? Options { get; set; }
        public int? OrderId { get; set; }
    }
}
