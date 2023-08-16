using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;

namespace SocialSpotBackend
{
    class Program
    {
        static void Main(string[] args)
        {
            var optionsBuilder = new DbContextOptionsBuilder<BloggingContext>();
            optionsBuilder.UseSqlite("Data Source=blogging.db"); // Or replace with your connection string

            using (var context = new BloggingContext(optionsBuilder.Options))
            {
                // Your code here...
            }
        }
    }
}
