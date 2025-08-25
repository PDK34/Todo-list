import Todo from "./todo";
import displayTodos from "./displayTodos";

const formContainer = document.querySelector('#form-container');
export default function addTodo(){
    if (!formContainer.classList.contains('hidden')) return;
    formContainer.classList.remove('hidden');


}

const form = document.querySelector('#newTodoForm');


form.addEventListener('submit' ,(e) => {
  e.preventDefault();

  const newTodo = new Todo(
      document.querySelector('#title').value,
      document.querySelector('#desc').value,
      document.querySelector('#dueDate').value,
      document.querySelector('#check').checked,
      document.querySelector('#priority').value
  );

  newTodo.id = crypto.randomUUID();

  form.reset()
  formContainer.classList.add('hidden');

  addTodoList(newTodo);

})

function addTodoList(todo){
  let todos = JSON.parse(localStorage.getItem('todos')) || [];
  todos.push(todo);
  localStorage.setItem('todos', JSON.stringify(todos));

  displayTodos();

}

