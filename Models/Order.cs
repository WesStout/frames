namespace inputTest.Models
{
    public class Order
    {
        public int OrderId { get; set; }
        public int UserId { get; set; }

        //External meaning shopify most likely
        public int ExternalOrderId { get; set; }
        public decimal TotalCost { get; set; }
        public bool PaidFor { get; set; }
        public bool Fulfilled { get; set; }
        public string? ShippingNumber { get; set; }
        public string? Name { get; set; }
        public string? Address { get; set; }
        public string? PhoneNumber { get; set; }
        public DateTime OrderDate { get; set; } 
        public string? AdditionalNotes{ get; set; }

    }
}
