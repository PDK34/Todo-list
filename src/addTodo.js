import Todo from "./todo";
import displayTodos from "./displayTodos";

export default function addTodo(){
    const container = document.querySelector('.todo-list')

    const formContainer = document.querySelector('#form-container');
    const form = document.querySelector('#newTodoForm');

    if (!formContainer.classList.contains('hidden')) return;

    formContainer.classList.remove('hidden');

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



    addTodoList(newTodo);

    

        })
}

function addTodoList(todo){
  let todos = JSON.parse(localStorage.getItem('todos')) || [];
  todos.push(todo);
  localStorage.setItem('todos', JSON.stringify(todos));

  displayTodos();
}

