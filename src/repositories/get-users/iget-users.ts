import { User } from "../../models/user";
import { HttpResponse } from "../../protocols/control-protocols/http-protocols";

export interface IGetUsers {
    handle(): Promise<HttpResponse<User[] | string>>
}

export interface IGetUsersRepository {
    getUsers(): Promise<User[]>
}

export interface IGetUserByIdRepository {
    getUserById(): Promise<User>
}