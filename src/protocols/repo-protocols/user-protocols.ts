import { User } from "../../models/user";

//Get
export interface IGetUsersRepository {
  getUsers(): Promise<User[]>;
}

//Post
export interface CreateUserParams {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
}
  
export interface ICreateUserRepository {
    createUser(params: CreateUserParams): Promise<User>;
}

//Patch
export interface UpdateUserParams {
    firstName?: string;
    lastName?: string;
    password?: string;
}
  
export interface IUpdateUserRepository {
    updateUser(id: string, params: UpdateUserParams): Promise<User>;
}

//Delete
export interface IDeleteUserRepository {
    deleteUser(id: string): Promise<User>;
}