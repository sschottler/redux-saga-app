import axios, { AxiosPromise } from "axios";

export interface User {
  firstName: string;
  lastName: string;
}
export const getUsers = (): AxiosPromise<User[]> => {
  return axios.get("/users", {
    params: {
      limit: 1000,
    },
  });
};

export const createUser = ({ firstName, lastName }): AxiosPromise<User> => {
  return axios.post("/users", {
    firstName,
    lastName,
  });
};

export const deleteUser = (userId) => {
  return axios.delete(`/users/${userId}`);
};
