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

    if (activeProject && activeProject.id === project.id) item.classList.add("active");

    nameSpan.addEventListener("click", () => {
      setActiveProject(project.id);
      displayProjects();
      displayTodos();
    });

    const deleteBtn = document.createElement("button");
    deleteBtn.classList.add("delete-project-btn");
    deleteBtn.type = "button";
    deleteBtn.title = "Delete project";
    deleteBtn.textContent = "✖";

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
