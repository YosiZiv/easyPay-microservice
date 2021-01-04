export interface UserData {
  userName: string;
  email: string;
  token: string;
}

export interface UserRO {
  user: UserData;
}
