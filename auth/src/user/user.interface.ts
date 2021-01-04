export interface UserData {
  user_name: string;
  email: string;
  token: string;
}

export interface UserRO {
  user: UserData;
}
