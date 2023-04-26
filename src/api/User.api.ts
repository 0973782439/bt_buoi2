import http from "../Utils/Http";
import { getAccesTokenLST } from "../Utils/Token";
import { IResponseApi } from "../interfaces/ICommon";
import { IUser } from "../interfaces/IUser";

export const getUser = () => http.get<IResponseApi<IUser>>("user");
export const updateUser = (file: any) => {
  const formData = new FormData();
  formData.append("file", file, file.name);
  return http.put<string>("user", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: getAccesTokenLST(),
    },
  });
};
