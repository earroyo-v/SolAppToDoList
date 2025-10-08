using Data.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Data.Interfaces
{
    public interface ITaskData
    {
        public List<TaskEntity> Get();
        public TaskEntity Get(int id);
        public void Create(TaskEntity task);
        public void Update(TaskEntity task);
        public void Delete(int id);
    }
}
