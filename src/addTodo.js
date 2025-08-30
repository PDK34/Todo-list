import Todo from "./todo.js";
import displayTodos from "./displayTodos.js";
import displayProjects from "./displayProjects.js";
import { getActiveProject, saveProjects, getProjects, setActiveProject } from "./projectManager.js";
import Project from "./project.js";

let editingTodoId = null;

export function setEditingTodoId(id) {
  editingTodoId = id;
}

export function getEditingTodoId() {
  return editingTodoId;
}

const formContainer = document.querySelector("#form-container");
const form = document.querySelector("#newTodoForm");
const addTodoBtn = document.querySelector(".add-todo-btn");
const submitBtn = document.querySelector(".submit");

export default function addTodo() {
  if (!formContainer.classList.contains("hidden")) return;
  formContainer.classList.remove("hidden");
  form.reset();
  submitBtn.textContent = editingTodoId ? "Update" : "Add";
}

form.onsubmit = (e) => {
  e.preventDefault();

  let projects = getProjects();
  let activeProject = getActiveProject();

  if (!activeProject) {
    const defaultProject = new Project("MyTodos");
    projects.push(defaultProject);
    setActiveProject(defaultProject.id);
    saveProjects(projects);
    activeProject = defaultProject;

    displayProjects();
  }

  const newTodo = new Todo(
    document.querySelector("#title").value,
    document.querySelector("#desc").value,
    document.querySelector("#dueDate").value,
    document.querySelector("#check").checked,
    parseInt(document.querySelector("#priority").value, 10)
  );

  if (editingTodoId) {
    const index = activeProject.todos.findIndex((t) => t.id === editingTodoId);
    if (index !== -1) {
      newTodo.id = editingTodoId;
      activeProject.todos[index] = newTodo;
    }
    editingTodoId = null;
    submitBtn.textContent = "Add";
  } else {
    newTodo.id = crypto.randomUUID();
    activeProject.todos.push(newTodo);
  }

  projects = projects.map((p) => (p.id === activeProject.id ? activeProject : p));
  saveProjects(projects);

  displayTodos();
  displayProjects();

  form.reset();
  formContainer.classList.add("hidden");
  addTodoBtn.classList.remove("active");
};
