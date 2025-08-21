import todo from './todo.js'

export default function pageLoad() {

    const container = document.querySelector('.todo-list');

    const header = document.createElement('div');
    header.classList.add('todo-header');
    const title = document.createElement('div');

    title.textContent = "MyProject";
    header.append(title);
    container.append(header);
    
}
