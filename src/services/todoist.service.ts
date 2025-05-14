// import client from "../utils/httpClient";
import { TodoistApi } from "@doist/todoist-api-typescript";
import { config } from "../config";

const api = new TodoistApi(config.TODOIST_API_TOKEN);

export const getProjects = async () => (await api.getProjects()).results;

export const getSections = async (projectId: string) =>
  (await api.getSections({ projectId: projectId })).results;

export const getTasks = async (sectionId: string) =>
  (await api.getTasks({ sectionId: sectionId })).results;

export const getComments = async (taskId: string) =>
  (await api.getComments({ taskId: taskId })).results;
