using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging; // Add this for logging

namespace SocialSpotBackend.Controllers
{
    public class HomeController : Controller
    {
        private readonly ILogger<HomeController> _logger;

        public HomeController(ILogger<HomeController> logger)
        {
            _logger = logger;
        }

        // GET: HomeController
        public ActionResult Index()
        {
            _logger.LogInformation("Index action executed");
            return View();
        }

        // GET: HomeController/Details/5
        public ActionResult Details(int id)
        {
            _logger.LogInformation("Details action executed for ID: {Id}", id);
            return View();
        }

        // GET: HomeController/Create
        public ActionResult Create()
        {
            _logger.LogInformation("Create action executed");
            return View();
        }

        // POST: HomeController/Create
        [HttpPost]
        public ActionResult Post(IFormCollection collection)
        {
            _logger.LogInformation("post action executed", collection);
            return Ok("This is creation aka, post");
        }

        // ... other actions ...

        [HttpGet]
        public IActionResult Get()
        {
            return Ok("Hello");
        }
    }
}
