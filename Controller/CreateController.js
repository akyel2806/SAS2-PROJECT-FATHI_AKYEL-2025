import { Task } from "../Models/Create.js";

const TaskForm = document.getElementById("create-tasks-form");
const tbody = document.querySelector("#all-tasks-table tbody");

const TaskManajer = new Task();

TaskForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const title = document.getElementById("title").value;
  const description = document.getElementById("description").value;
  const status = document.getElementById("status").value;
  const due_date = document.getElementById("due-date").value;

  TaskManajer.addTask(title, description, status, due_date);

  renderTask();
  TaskForm.reset();
});

function renderTask() {
//   tbody.innerHTML = "";

  const semuaDataTask = TaskManajer.getCreateTaskFromLocalStorage();

  semuaDataTask.forEach((data) => {
    const row = document.createElement("tr");

    row.innerHTML = `
        <td>${data.title}</td>
        <td>${data.description}</td>
        <td>${data.status}</td>
        <td>${data.due_date}</td>
        <td>
            <button class="btn btn-warning" id="edit-${data.id}">Edit</button>
            <button class="btn btn-danger" id="delete-${data.id}">Delete</button>
        </td>
        `;

    tbody.appendChild(row);

    document.getElementById(`edit-${data.id}`).addEventListener("click", () => {
      editTask(data.id);
    });

    document
      .getElementById(`delete-${data.id}`)
      .addEventListener("click", () => {
        deleteTask(data.id);
      });
  });
}

function editTask(id) {
  const semuaDataTask = TaskManajer.getCreateTaskFromLocalStorage();

  const editDataTask = semuaDataTask.filter((data) => data.id === id);

  document.getElementById("title").value = editDataTask[0].id;
  document.getElementById("description").value = editDataTask[0].id;
  document.getElementById("status").value = editDataTask[0].id;
  document.getElementById("due_date").value = editDataTask[0].id;
}

function deleteTask(id) {
  TaskManajer.deleteTask(id);
  renderTask();
}

document.addEventListener("DOMContentLoaded", () => {
  renderTask();
});
