import { getProjects, getActiveProject, setActiveProject, saveProjects } from "./projectManager.js";
import displayTodos from "./displayTodos.js";

export default function displayProjects() {
  const projectListContainer = document.querySelector(".project-items");
  if (!projectListContainer) return;

  const projects = getProjects();
  const activeProject = getActiveProject();

  
  projectListContainer.innerHTML = "";

  const list = document.createElement("div");
  list.className = "project-items-list";

  projects.forEach(project => {
    const item = document.createElement("div");
    item.classList.add("project-item");
    item.dataset.projectId = project.id;

    const nameSpan = document.createElement("span");
    nameSpan.classList.add("project-name");
    nameSpan.textContent = project.name;

    if (activeProject && activeProject.id === project.id) item.classList.add("active-project");

    item.addEventListener("click", () => {
      setActiveProject(project.id);
      displayProjects();
      displayTodos();
    });

    const deleteBtn = document.createElement("button");
    deleteBtn.classList.add("delete-project-btn");
    deleteBtn.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#2a2a2aff"><path d="m376-300 104-104 104 104 56-56-104-104 104-104-56-56-104 104-104-104-56 56 104 104-104 104 56 56Zm-96 180q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520Zm-400 0v520-520Z"/></svg>';
    deleteBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      if (!confirm(`Are you sure you want to delete project "${project.name}"? This will remove all its todos.`)) {
        return;
      }

      const remaining = projects.filter(p => p.id !== project.id);

      const activeId = localStorage.getItem("activeProjectId");
      if (activeId === project.id) {
        if (remaining.length > 0) {
          localStorage.setItem("activeProjectId", remaining[0].id);
        } else {
          localStorage.removeItem("activeProjectId");
        }
      }

      saveProjects(remaining);
      displayProjects();
      displayTodos();
    });

    item.appendChild(nameSpan);
    item.appendChild(deleteBtn);
    list.appendChild(item);
  });

  projectListContainer.appendChild(list);
}
