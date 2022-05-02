export interface DialogBoxData {
  action: string;
  id?: string;
  param?: string;
}
export interface DialogColumData {
  action: string;
  title: string;
}
export interface DialogTaskData {
  action: string;
  title: string;
  desc: string;
  userId: string;
}
export interface UserResponce {
  id: string;
  name: string;
  login: string;
}
