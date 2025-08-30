import { getActiveProject } from "./projectManager.js";

export default function showDescription(todoDiv) {
  const existingDesc = todoDiv.querySelector('.todo-description');
  const descBtn = todoDiv.querySelector('.description');
  const todoID = todoDiv.dataset.id;

  const activeProject = getActiveProject();
  if (!activeProject) return;

  const todo = activeProject.todos.find(t => t.id === todoID);
  if (!todo || !todo.description) {
    return;
  }

  document.querySelectorAll('.todo-description').forEach(descEl => {
    const parent = descEl.closest('.todo-item');
    if (parent && parent !== todoDiv) {
      descEl.remove();
      parent.querySelector('.description')?.classList.remove('checked');
    }
  });

  if (existingDesc) {
    existingDesc.remove();
    descBtn.classList.remove('checked');
    return;
  }

  descBtn.classList.add('checked');

  const descDiv = document.createElement('div');
  descDiv.classList.add('todo-description');
  descDiv.textContent = todo.description;

  const titleDiv = todoDiv.querySelector('.title');
  titleDiv.insertAdjacentElement('beforeend', descDiv);
}
