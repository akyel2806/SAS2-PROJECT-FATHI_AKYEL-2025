
document.addEventListener("DOMContentLoaded", () => {
  const taskContainer = document.getElementById("task-list");

  function loadTasks() {
    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    taskContainer.innerHTML = "";

    tasks.forEach((task) => {
      const taskEl = document.createElement("div");
      taskEl.className = "card mb-2 p-3";
      taskEl.innerHTML = `
        <h5>${task.title}</h5>
        <p>${task.description}</p>
        <p>Status: <strong>${task.status}</strong></p>
        <p>Due Date: ${task.dueDate}</p>
        <button class="btn btn-sm btn-secondary edit" data-id="${task.id}">Edit</button>
        <button class="btn btn-sm btn-danger delete" data-id="${task.id}">Delete</button>
      `;
      taskContainer.appendChild(taskEl);
    });
  }

  taskContainer.addEventListener("click", (e) => {
    if (e.target.classList.contains("delete")) {
      const id = e.target.getAttribute("data-id");
      let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
      tasks = tasks.filter((task) => task.id !== id);
      localStorage.setItem("tasks", JSON.stringify(tasks));
      loadTasks();
    }

    if (e.target.classList.contains("edit")) {
      const id = e.target.getAttribute("data-id");
      const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
      const task = tasks.find((t) => t.id === id);
      if (task) {
        const newTitle = prompt("Edit title:", task.title);
        const newDesc = prompt("Edit description:", task.description);
        const newStatus = prompt("Edit status (completed/not-completed):", task.status);
        const newDueDate = prompt("Edit due date:", task.dueDate);

        if (newTitle && newDesc && newStatus && newDueDate) {
          task.title = newTitle;
          task.description = newDesc;
          task.status = newStatus;
          task.dueDate = newDueDate;
          localStorage.setItem("tasks", JSON.stringify(tasks));
          loadTasks();
        }
      }
    }
  });

  loadTasks();
});
