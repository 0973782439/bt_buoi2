export interface IResponseApi<Data> {
  message?: string;
  data: Data;
  status?: number;
}
export type AuthResponse = IResponseApi<{ token: string; user: string }>;
export interface IDataResponse {
  data: [];
}
export enum Language {
  vi = "vi",
  en = "en",
}
