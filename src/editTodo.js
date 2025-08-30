import { setEditingTodoId } from "./addTodo.js";

const formContainer = document.querySelector('#form-container');
const addTodoBtn = document.querySelector('.add-todo-btn');
const submitBtn = document.querySelector('.submit');

export default function editTodo(todo) {

  formContainer.classList.remove('hidden');
  addTodoBtn.classList.add('active');
  submitBtn.textContent = "Update";

  setEditingTodoId(todo.id);

  document.querySelector('#title').value = todo.title || "";
  document.querySelector('#desc').value = todo.description || "";
  document.querySelector('#dueDate').value = todo.dueDate || "";
  document.querySelector('#check').checked = !!todo.check;
  document.querySelector('#priority').value = todo.priority ?? "0";
}
