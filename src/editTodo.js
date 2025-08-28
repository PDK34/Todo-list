
import { setEditingTodoId } from "./addTodo"; 

const formContainer = document.querySelector('#form-container');
const addTodoBtn = document.querySelector('.add-todo-btn');
const submitBtn = document.querySelector('.submit');

export default function editTodo(todo) {
    if (!formContainer.classList.contains('hidden')) return;
    formContainer.classList.remove('hidden');
    addTodoBtn.classList.add('active'); 
    submitBtn.textContent = "Update";

    setEditingTodoId(todo.id);

    document.querySelector('#title').value = todo.title;
    document.querySelector('#desc').value = todo.description;
    document.querySelector('#dueDate').value = todo.dueDate;
    document.querySelector('#check').checked = todo.check;
    document.querySelector('#priority').value = todo.priority;
}
