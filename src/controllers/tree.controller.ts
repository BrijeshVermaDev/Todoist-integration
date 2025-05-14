import { Request, Response } from "express";
import * as todoist from "../services/todoist.service";

export const getTree = async (req: Request, res: Response) => {
  const projects = await todoist.getProjects();
  const sections = (
    await Promise.all(
      projects.map((project) => todoist.getSections(project.id))
    )
  ).flat();
  const tasks = (
    await Promise.all(sections.map((section) => todoist.getTasks(section.id)))
  ).flat();
  const comments = (
    await Promise.all(tasks.map((task) => todoist.getComments(task.id)))
  ).flat();

  const tasksBySection: any = {};
  tasks.forEach((task) => {
    if (task.sectionId) {
      if (!tasksBySection[task.sectionId]) tasksBySection[task.sectionId] = [];
      tasksBySection[task.sectionId].push({
        ...task,
        comments: comments.filter((c) => c.taskId === task.id),
      });
    }
  });

  const sectionsByProject: any = {};
  sections.forEach((section) => {
    if (!sectionsByProject[section.projectId])
      sectionsByProject[section.projectId] = [];
    sectionsByProject[section.projectId].push({
      ...section,
      tasks: tasksBySection[section.id] || [],
    });
  });

  const result = projects.map((project) => ({
    ...project,
    sections: sectionsByProject[project.id] || [],
  }));

  res.json(result);
};
