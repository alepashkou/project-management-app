import { Task } from './boards.model';
export interface DialogBoxData {
  action: string;
  id?: string;
  param?: string;
  title: string;
  description: string;
}
export interface DialogColumData {
  action: string;
  title: string;
}
export interface DialogTaskData {
  action: string;
  task: Task;
}
export interface UserResponce {
  id: string;
  name: string;
  login: string;
}
