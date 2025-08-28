import Todo from "./todo";
import displayTodos from "./displayTodos";

let editingTodoId = null;
export function setEditingTodoId(id) {
  editingTodoId = id;
}
export function getEditingTodoId() {
  return editingTodoId;
}

const formContainer = document.querySelector('#form-container');
export default function addTodo(){
    if (!formContainer.classList.contains('hidden')) return;
    formContainer.classList.remove('hidden');


}

const form = document.querySelector('#newTodoForm');
const addTodoBtn = document.querySelector('.add-todo-btn');
const submitBtn = document.querySelector('.submit');


form.onsubmit = (e) => {
  e.preventDefault();

  const newTodo = new Todo(
      document.querySelector('#title').value,
      document.querySelector('#desc').value,
      document.querySelector('#dueDate').value,
      document.querySelector('#check').checked,
      document.querySelector('#priority').value
  );

  if (editingTodoId) {
    newTodo.id = editingTodoId;
    updateTodoList(newTodo);
    editingTodoId = null; 
    submitBtn.textContent = "Add";
  } else {
    newTodo.id = crypto.randomUUID();
    addTodoList(newTodo);
  }

  form.reset()
  formContainer.classList.add('hidden');
    addTodoBtn.classList.remove('active');
  
}

export function addTodoList(todo){
  let todos = JSON.parse(localStorage.getItem('todos')) || [];
  todos.push(todo);
  localStorage.setItem('todos', JSON.stringify(todos));

  displayTodos();

}

export function updateTodoList(updatedTodo) {
  let todos = JSON.parse(localStorage.getItem('todos')) || [];
  const index = todos.findIndex(t => t.id === updatedTodo.id );
  if (index !== -1) {
    todos[index] = updatedTodo;
  } else {
    todos.push(updatedTodo);
  }

  localStorage.setItem('todos', JSON.stringify(todos));
  displayTodos();
}
