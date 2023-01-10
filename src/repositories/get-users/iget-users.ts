import { User } from "../../models/user";
import { HttpResponse } from "../../services/services";

export interface IGetUsers {
    handle(): Promise<HttpResponse<User[]>>
}

export interface IGetUsersRepository {
    getUsers(): Promise<User[]>
}