
export default function addTodo(){
    const container = document.querySelector('.todo-list')
  const addTodoBtn = document.querySelector('.add-todo-btn');

    const formContainer = document.querySelector('#form-container');
    if (!formContainer.classList.contains('hidden')) return;

    formContainer.classList.remove('hidden');

    

}
