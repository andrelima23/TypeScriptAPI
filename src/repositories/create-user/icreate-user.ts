import { User } from "../../models/user";
import { HttpRequest, HttpResponse } from "../../protocols/http-protocols";

export interface ICreateUser {
    handle(httpRequest: HttpRequest<ICreateUserParams>): Promise<HttpResponse<User | string>>
}

export interface ICreateUserParams {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
}

export interface ICreateUserRepository {
    createUser(params: ICreateUserParams): Promise<User>;
}