// Please see documentation at https://learn.microsoft.com/aspnet/core/client-side/bundling-and-minification
// for details on configuring this project to bundle and minify static web assets.

// Write your JavaScript code.
document.addEventListener("DOMContentLoaded", () => {
    const table = document.getElementById("taskContainer");
    fetch("/Task/Get")
        .then(response => response.json())
        .then(data => {
            console.log(data);
            table.innerHTML = data.map(getTable).join('');
        })
        .catch()

    function getTable(task) {
        return `
    <div class="accordion-item border rounded shadow-sm mb-2" data-id="${task.id}" data-important="${task.isImportant}" data-completed="${task.isCompleted}">
    <h2 class="accordion-header d-flex align-items-center justify-content-between px-3 py-2 bg-light">
        <!-- Check a la izquierda -->
        <i class="bi ${task.isCompleted ? 'bi-check-circle-fill text-success' : 'bi-circle text-secondary'} fs-5" style="cursor: pointer;" title="Marcar como completada"></i>

        <!-- Botón del accordion -->
        <button class="accordion-button collapsed flex-grow-1 mx-3 bg-light border-0" type="button"
                data-bs-toggle="collapse" data-bs-target="#collapse-${task.id}"
                aria-expanded="false" aria-controls="collapse-${task.id}">
            <div class="d-flex flex-column text-start">
                <span class="fw-semibold">${task.title}</span>
                <small class="text-muted">
                    <i class="bi bi-calendar-event me-1"></i> ${task.dueDate ?? 'Sin fecha'}
                </small>
            </div>
        </button>

        <!-- Estrella a la derecha -->
        <i class="bi ${task.isImportant ? 'bi-star-fill text-warning' : 'bi-star text-secondary'} fs-5" style="cursor: pointer;" title="Marcar como importante"></i>
    </h2>

    <div id="collapse-${task.id}" class="accordion-collapse collapse" data-bs-parent="#accordionExample">
        <div class="accordion-body">
            <p><strong>Descripción:</strong> ${task.description}</p>
            <p><strong>Notas:</strong> ${task.notes ?? 'Sin notas'}</p>

            <div class="d-flex gap-2 mt-3">
                <button class="btn btn-outline-success btn-sm">
                    <i class="bi bi-check-circle"></i> Completar
                </button>
                <button class="btn btn-outline-warning btn-sm">
                    <i class="bi bi-star"></i> Importante
                </button>
                <button class="btn btn-outline-primary btn-sm">
                    <i class="bi bi-pencil-square"></i> Editar
                </button>
                <button class="btn btn-outline-danger btn-sm">
                    <i class="bi bi-trash"></i> Eliminar
                </button>
            </div>
        </div>
    </div>
    </div>`;


    }

    table.addEventListener("click", (event) => {
        const icon = event.target;

        // Estrella (importante)
        if (icon.classList.contains("bi-star") || icon.classList.contains("bi-star-fill")) {
            const item = icon.closest(".accordion-item");
            const isImportant = icon.classList.contains("bi-star");

            if (isImportant) {
                icon.classList.remove("bi-star", "text-secondary");
                icon.classList.add("bi-star-fill", "text-warning");
                item.dataset.important = "true";
            } else {
                icon.classList.remove("bi-star-fill", "text-warning");
                icon.classList.add("bi-star", "text-secondary");
                item.dataset.important = "false";
            }
        }

        // Completado
        if (icon.classList.contains("bi-circle") || icon.classList.contains("bi-check-circle-fill")) {
            const item = icon.closest(".accordion-item");
            const isCompleted = icon.classList.contains("bi-circle");

            if (isCompleted) {
                icon.classList.remove("bi-circle", "text-secondary");
                icon.classList.add("bi-check-circle-fill", "text-success");
                item.dataset.completed = "true";
            } else {
                icon.classList.remove("bi-check-circle-fill", "text-success");
                icon.classList.add("bi-circle", "text-secondary");
                item.dataset.completed = "false";
            }
        }
    });
})