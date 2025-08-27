
export default function showDescription(todoDiv){

    const existingDesc = todoDiv.querySelector('.todo-description');
    const desc = todoDiv.querySelector('.description');
    const todoID = todoDiv.dataset.id;

    const todos = JSON.parse(localStorage.getItem('todos'))||[];
    const todo = todos.find((todo) => todo.id === todoID);
    if (!todo || !todo.description) {
        return; 
    } 

    document.querySelectorAll('.todo-description').forEach(desc => {
    const parent = desc.closest('.todo-item');
    if (parent && parent !== todoDiv) {
    desc.remove();
    parent.querySelector('.description')?.classList.remove('checked');
        }
    });

    if (existingDesc) {
        existingDesc.remove(); 
        desc.classList.remove('checked'); 
        return;
    }

    desc.classList.add('checked');

    const descDiv = document.createElement('div');
    descDiv.classList.add('todo-description');
    descDiv.textContent = todo.description;

    const titleDiv = todoDiv.querySelector('.title');
    titleDiv.insertAdjacentElement('beforeend', descDiv);    
}
