import Project from "./project.js";

export function getProjects() {
  const data = localStorage.getItem("projects");
  if (!data || data === "undefined") return [];
  try {
    return JSON.parse(data);
  } catch (e) {
    console.error("Corrupted projects data in storage:", e);
    return [];
  }
}

export function saveProjects(projects) {
  localStorage.setItem("projects", JSON.stringify(projects));
}

export function getActiveProject() {
  const projects = getProjects();
  const activeId = localStorage.getItem("activeProjectId");
  return projects.find(p => p.id === activeId) || projects[0] || null;
}

export function setActiveProject(id) {
  localStorage.setItem("activeProjectId", id);
}

export function initializeProjects() {
  const data = localStorage.getItem("projects");
  if (!data || data === "undefined") {
    const defaultProject = new Project("Default Project");
    saveProjects([defaultProject]);
    setActiveProject(defaultProject.id);
  }
}
