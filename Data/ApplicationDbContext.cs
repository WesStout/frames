using inputTest.Models;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using static System.Net.Mime.MediaTypeNames;

namespace inputTest.Data
{
    public class ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : IdentityDbContext(options)
    {
        public DbSet<inputTest.Models.Frame> Frames { get; set; } = default!;
        public DbSet<inputTest.Models.Order> Orders { get; set; } = default!;

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            //Basic setup for primary keys
            modelBuilder.Entity<Order>()
                .HasKey(c => c.OrderId);
            modelBuilder.Entity<Frame>()
                .HasKey(c => c.FrameId);

        }
    }
}

    

