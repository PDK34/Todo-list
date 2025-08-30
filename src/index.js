import "./style.css";

import addTodo from "./addTodo.js";
import displayTodos from "./displayTodos.js";
import displayProjects from "./displayProjects.js";
import { initializeProjects, getProjects, saveProjects, setActiveProject } from "./projectManager.js";

initializeProjects();
displayProjects();
displayTodos();

const addTodoBtn = document.querySelector(".add-todo-btn");

addTodoBtn.addEventListener("click", () => {
  const formContainer = document.querySelector("#form-container");
  const form = formContainer.querySelector("form");
  const textarea = form.querySelector("textarea");

  if (!addTodoBtn.classList.contains("active")) {
    addTodo();
    addTodoBtn.classList.add("active");
  } else {
    addTodoBtn.classList.remove("active");
    formContainer.classList.add("hidden");
    form.reset();
    if (textarea) {
      textarea.style.width = "";
      textarea.style.height = "";
    }
  }
});

const addProjectBtn = document.querySelector(".add-project-btn");
if (addProjectBtn) {
  addProjectBtn.addEventListener("click", () => {
    const projectName = prompt("Enter new project name:");
    if (!projectName) return;

    const projects = getProjects();
    const newProject = { id: crypto.randomUUID(), name: projectName, todos: [] };

    projects.push(newProject);
    saveProjects(projects);
    setActiveProject(newProject.id);

    displayProjects();
    displayTodos();
  });
}
