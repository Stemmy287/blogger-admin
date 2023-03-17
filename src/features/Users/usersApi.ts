import {headers, instance} from "common/constants/instanceApi";
import {ResponseType} from "features/Blogs/blogsApi";
import {AxiosResponse} from "axios";

export const apiUsers = {
  getUsers() {
    return instance.get<ResponseType<UserType[]>>('api/users', {headers})
      .then(res => res.data)
  },
  addUser(data: AddUserType) {
    return instance.post<'', AxiosResponse<UserType>, AddUserType>('api/users', data, {headers})
      .then(res => res.data)
  },
  deleteUser(id: string) {
    return instance.delete(`api/users/${id}`, {headers})
  }
}

export type UserType = {
  "id": string,
  "login": string
  "email": string
  "createdAt": string
}

export type AddUserType = {
  "login": string,
  "password": string
  "email": string
}