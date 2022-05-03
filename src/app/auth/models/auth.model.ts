
export interface AuthInfo {
  login: string;
  token: string;
}

export interface SignIn {
  login: string;
  password: string;
}

export interface SignUp {
  name: string;
  login: string;
  password: string;
}

export interface UserInfo {
  id: string;
  name: string;
  login: string;
}