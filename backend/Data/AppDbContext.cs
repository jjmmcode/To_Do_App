using Microsoft.EntityFrameworkCore;
using backend.Models;

namespace backend.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options)
            : base(options)
        {
        }

        public DbSet<backend.Models.Task> Tasks => Set<backend.Models.Task>();
        public DbSet<backend.Models.User> Users => Set<backend.Models.User>();
    }
}