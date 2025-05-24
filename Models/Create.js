class Task {
  constructor(title, description, status, due_date) {
    this.id = Date.now();
    this.title = title;
    this.description = description;
    this.status = status;
    this.due_date = due_date;
  }

  getCreateTaskFromLocalStorage() {
    try {
      return JSON.parse(localStorage.getItem("TaskForm")) || [];
    } catch (error) {
      console.error("Error reading create task from localstorage:", error);
    }
  }

  saveTaskToLocalStorage(data) {
    try {
      localStorage.setItem("TaskForm", JSON.stringify(data));
    } catch (error) {
      console.error("Error saving Task Form to localstorage:", error);
    }
  }

  addTask(title, description, status, due_date) {
        try {
            if (!title || !description || !status || !due_date) {
                throw new Error("Number Title Description Status Due_Date are required.");
            }

            if (oldId === "") {
                const newId = this.generateTask();
                console.log("Generate Task id: ", newId);

                const semuaDataTask =
                    this.getCreateTaskFromLocalStorage();

                const dataBaruTask = new Task(newId, title, description, status, due_date);

                semuaDataTask.push(dataBaruTask);

                this.saveTaskToLocalStorage(semuaDataTask);
                alert("Berhasil menambahkan Task.");
            } else {
                this.editTask(title, description, status, due_date);
                alert("Berhasil update jenis penilaian.");
            }
        } catch (error) {
            console.error("Error while adding jenis penilaian: ", error);
        }
    }

  generateTask() {
    try {
      const timestamp = Date.now().toString().slice(-6);
      return `TASK-${timestamp}`;
    } catch (error) {
      console.error("Error While generate task :", error);
    }
  }

  deleteTask(id) {
    try {
      if (!id) {
        throw new Error("ID are required.");
      }

      let semuaDataTask = this.getCreateTaskFromLocalStorage();

      semuaDataTask = semuaDataTask.filter((data) => data.id !== id);

      this.saveTaskToLocalStorage(semuaDataTask);
      alert("Data berhasil dihapus.");
    } catch (error) {
      console.error("Error deleting jenis penilaian: ", error);
    }
  }

  editTask(newtitle, description, status, due_date) {
    try {
      if (!newtitle || !description || !status || !due_date) {
        throw new Error("ALL are required");
      }

      const semuaDataTask = this.getCreateTaskFromLocalStorage();

      let editDataTask = semuaDataTask.filter((data) => data.id === id);

      editDataTask[0].id = newtitle;

      this.saveTaskToLocalStorage(semuaDataTask);
    } catch (error) {
      console.error("Error Editing task:", error);
    }
  }
}

export { Task };
