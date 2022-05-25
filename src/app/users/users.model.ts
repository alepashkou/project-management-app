export interface UserInfo {
  id: string;
  name: string;
  login: string;
}

export interface UpdateUser {
  name: string;
  login: string;
  password: string;
}