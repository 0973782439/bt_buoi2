export interface ISingUp {
  email: string;
  password: string;
  repeatPassword: string;
  name: string;
  gender: Gender;
  region: number;
  state: number;
}
export interface IGender {
  id: string;
  value: string;
}
export enum Gender {
  male = "Nam",
  female = "Nữ",
}
export interface ILocation {
  id: string | number;
  name: string;
  pid: string | null;
}
