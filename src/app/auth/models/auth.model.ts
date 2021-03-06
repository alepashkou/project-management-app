
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

export interface TokenData {
  userId: string;
  login: string;
  iat: number;
}


