export interface Board {
  id: string;
  title: string;
  description: string;
  columns?: Colum[];
}
export interface Colum {
  id: string;
  title: string;
  order: number;
  tasks?: Task[];
}

export interface Task {
  id: string;
  title: string;
  order: number;
  done?: boolean;
  description: string;
  userId: string;
  user: UserData;
}
export interface Token {
  token: string;
}

export interface UserData {
  name: string;
}
export interface Order {
  id: string;
  order: number;
}
