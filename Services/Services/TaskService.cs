using Data.Interfaces;
using Data.Models;
using Services.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Services.Services
{
    public class TaskService : ITaskService
    {
        private readonly ITaskData _data;
        public TaskService(ITaskData data)
        {
            _data = data;
        }
        public List<TaskEntity> Obtener()
        {
            return _data.Get();
        }
        public TaskEntity Obtener(int id)
        {
            return _data.Get(id);
        }
        public void Crear(TaskEntity task)
        {
            _data.Create(task);
        }
        public void Editar(TaskEntity task)
        {
            _data.Update(task);
        }
        public void Delete(int id)
        {
            _data.Delete(id);
        }
    }
}
