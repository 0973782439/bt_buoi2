import { Gender } from "./ISingUp";

export interface IUser {
  email: string;
  password: string;
  name: string;
  gender: Gender;
  avatar: string;
  region: number;
  state: number;
  description: string;
}
