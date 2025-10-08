using System.Diagnostics;
using Data.Models;
using Microsoft.AspNetCore.Mvc;
using Services.Interfaces;
using WebAppToDoList.Models;

namespace WebAppToDoList.Controllers
{
    public class TaskController : Controller
    {
        private readonly ITaskService _service;

        public TaskController(ITaskService sevice)
        {
            _service = sevice;
        }

        public IActionResult Index()
        {
            return View();
        }
        public IActionResult Get()
        {
            List<TaskModel> tasks = new List<TaskModel>();
            foreach (var data in _service.Obtener())
            {
                TaskModel task = new TaskModel()
                {
                    Id = data.Id,
                    Title = data.Title,
                    Description = data.Description,
                    Important = data.Important,
                    Completed = data.Completed,
                    DueDate = data.DueDate
                };
                tasks.Add(task);
            }
            return Json(tasks);
        }
        public IActionResult Create([FromBody] TaskModel data)
        {
            var task = new TaskEntity()
            {
                Id = data.Id,
                Title = data.Title,
                Description = data.Description,
                Important = data.Important,
                Completed = data.Completed,
                DueDate = data.DueDate
            };
            _service.Crear(task);
            return Json(new { success = true, message = "Tarea creada" });
        }
        public IActionResult Edit([FromBody] TaskModel data)
        {
            var task = new TaskEntity()
            {
                Id = data.Id,
                Title = data.Title,
                Description = data.Description,
                Important = data.Important,
                Completed = data.Completed,
                DueDate = data.DueDate
            };
            _service.Editar(task);
            return Json(new { success = true, message = "Tarea actualizada" });
        }
        public IActionResult Delete(int id)
        {
            _service.Delete(id);
            return Json(new { success = true, message = "Tarea eliminada" });
        }
        public IActionResult Privacy()
        {
            return View();
        }

        [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
        public IActionResult Error()
        {
            return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
        }
    }
}
