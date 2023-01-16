import { User } from "../../models/user";
import { HttpRequest, HttpResponse } from "../../protocols/control-protocols/http-protocols";

export interface IDeleteUser {
    handle(httpRequest: HttpRequest<string>): Promise<HttpResponse<User | string>>
}

export interface IDeleteUserRepository {
    deleteUser(id: string): Promise<User>
}