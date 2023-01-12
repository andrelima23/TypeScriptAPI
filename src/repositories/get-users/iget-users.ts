import { User } from "../../models/user";
import { HttpResponse, HttpRequest } from "../../protocols/control-protocols/http-protocols";

export interface IGetUsers {
    handle(): Promise<HttpResponse<User[] | string>>
}

export interface IGetUserById {
    handle(httpRequest: HttpRequest<string>): Promise<HttpResponse<User | string>>
}

export interface IGetUsersRepository {
    getUsers(): Promise<User[]>
}

export interface IGetUserByIdRepository {
    getUserById(id: string): Promise<User>
}