import { getProjects, saveProjects } from "./projectManager.js";

export default function checkUpdate(updatedTodo) {
  const projects = getProjects();
  if (!projects || projects.length === 0) return;

  for (let project of projects) {
    const idx = project.todos.findIndex(t => t.id === updatedTodo.id);
    if (idx !== -1) {
      project.todos[idx] = { ...project.todos[idx], check: !!updatedTodo.check };
      saveProjects(projects);
      return;
    }
  }
}
