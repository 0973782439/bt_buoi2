import http from "../Utils/Http";
import { IResponseApi } from "../interfaces/ICommon";
import { IFormLoginValidate } from "../interfaces/ILogIn";
import { ISingUp } from "../interfaces/ISingUp";

export const Login = (value: IFormLoginValidate) =>
  http.post<IResponseApi<any>>("auth/login", value);
export const Singup = (value: ISingUp) =>
  http.post<IResponseApi<any>>("auth/register", value);
