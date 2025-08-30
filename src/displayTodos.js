import deleteTodo from "./deleteTodo.js";
import checkUpdate from "./checkTodo.js";
import { format } from "date-fns";
import showDescription from "./showDescription.js";
import editTodo from "./editTodo.js";
import { getActiveProject } from "./projectManager.js";

export default function displayTodos() {
  const activeProject = getActiveProject();
  const container = document.querySelector(".todo-items");
  if (!container) return;

  const headerTitle = document.querySelector('.todo-header .title');
  if (headerTitle) {
    if (activeProject) {
      headerTitle.textContent = activeProject.name;
    } else {
      headerTitle.textContent = "MyTodos";
    }
  }


  if (!activeProject || !Array.isArray(activeProject.todos) || activeProject.todos.length === 0) {
    container.innerHTML =
      '<div class="empty-state">No todos added yet. Add one to get started!</div>';
    return;
  }

  const todos = [...activeProject.todos].sort((a, b) => {
    if (a.check === b.check) return 0;
    return a.check ? 1 : -1;
  });

  container.innerHTML = "";

  todos.forEach((todo) => {
    const todoElement = createTodoElement(todo);
    container.append(todoElement);
  });
}

function createTodoElement(todo) {
  const tododiv = document.createElement("div");
  tododiv.classList.add("todo-item");
  tododiv.dataset.id = todo.id;

  const title = document.createElement("div");
  title.classList.add("title");
  title.textContent = todo.title;

  const dueDate = document.createElement("div");
  dueDate.classList.add("due-date");
  if (todo.dueDate) {
    try {
      const date = new Date(todo.dueDate);
      dueDate.textContent = format(date, "dd-MM-yy(EEE)");
    } catch {
      dueDate.textContent = todo.dueDate;
    }
  }

  const rightDiv = document.createElement("div");
  rightDiv.classList.add("p-d");

  const priority = document.createElement("div");
  priority.classList.add("priority");

  const desc = document.createElement("div");
  desc.classList.add("description");

  const edit = document.createElement("div");
  edit.classList.add("edit");

  const deleteBtn = document.createElement("div");
  deleteBtn.classList.add("delete");

  priority.innerHTML =
    todo.priority == 0
      ? `<div><svg viewBox="0 0 36 36" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="img" class="iconify iconify--twemoji" preserveAspectRatio="xMidYMid meet" fill="#000000"><g id="SVGRepo_iconCarrier"><path fill="#55ACEE" d="M7.707 18.708a1.003 1.003 0 0 1 0-1.414l9.585-9.586a1.003 1.003 0 0 1 1.414 0l9.587 9.587a1.003 1.003 0 0 1 0 1.414l-9.587 9.585a1.003 1.003 0 0 1-1.414 0l-9.585-9.586z"></path></g></svg></div>`
      : todo.priority == 1
      ? `<div class="moderate-icon"><svg viewBox="0 0 36 36" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="img" class="iconify iconify--twemoji" preserveAspectRatio="xMidYMid meet" fill="#000000"><g id="SVGRepo_iconCarrier"><circle fill="#FDCB58" cx="18" cy="18" r="18"></circle></g></svg></div>`
      : `<div class="urgent-icon">!</div>`;

  tododiv.classList.add(
    todo.priority == 0 ? "normal" : todo.priority == 1 ? "moderate" : "urgent"
  );

  if (todo.check === true) {
    tododiv.classList.add("checked");
  }

  tododiv.addEventListener("dblclick", (e) => {
    if (
      desc.contains(e.target) ||
      deleteBtn.contains(e.target) ||
      edit.contains(e.target) ||
      priority.contains(e.target)
    )
      return;

    todo.check = !todo.check;
    if (todo.check) tododiv.classList.add("checked");
    else tododiv.classList.remove("checked");

    checkUpdate(todo); 
    displayTodos(); 
  });

  desc.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#FFFFFF"><path d="M320-240h320v-80H320v80Zm0-160h320v-80H320v80ZM240-80q-33 0-56.5-23.5T160-160v-640q0-33 23.5-56.5T240-880h320l240 240v480q0 33-23.5 56.5T720-80H240Zm280-520v-200H240v640h480v-440H520ZM240-800v200-200 640-640Z"/></svg>`;
  edit.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#FFFFFF"><path d="M200-200h57l391-391-57-57-391 391v57Zm-80 80v-170l528-527q12-11 26.5-17t30.5-6q16 0 31 6t26 18l55 56q12 11 17.5 26t5.5 30q0 16-5.5 30.5T817-647L290-120H120Zm640-584-56-56 56 56Zm-141 85-28-29 57 57-29-28Z"/></svg>`;
  deleteBtn.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#FFFFFF"><path d="m376-300 104-104 104 104 56-56-104-104 104-104-56-56-104 104-104-104-56 56 104 104-104 104 56 56Zm-96 180q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520Zm-400 0v520-520Z"/></svg>`;

  deleteBtn.addEventListener("click", () => {
    deleteTodo(todo);
    displayTodos();
  });

  if (!todo.description) {
    desc.classList.add("no-desc");
  } else {
    desc.classList.remove("no-desc");
  }

  desc.addEventListener("click", () => {
    showDescription(tododiv);
  });

  edit.addEventListener("click", () => {
    editTodo(todo);
  });

  rightDiv.append(priority, desc, edit, deleteBtn);
  tododiv.append(dueDate, title, rightDiv);

  return tododiv;
}
