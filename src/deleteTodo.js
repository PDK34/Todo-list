import { getProjects, saveProjects } from "./projectManager.js";

export default function deleteTodo(todo) {
  const projects = getProjects();
  if (!projects || projects.length === 0) return;

  let changed = false;
  for (let p of projects) {
    const before = p.todos.length;
    p.todos = p.todos.filter(t => t.id !== todo.id);
    if (p.todos.length !== before) changed = true;
  }

  if (changed) {
    saveProjects(projects);
  }
}
