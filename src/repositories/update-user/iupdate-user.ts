import { User } from '../../models/user';
import { HttpResponse, HttpRequest } from '../../protocols/http-protocols';

export interface IUpdateUser {
    handle(httpRequest: HttpRequest<UpdateUserParams>): Promise<HttpResponse<User | string>>
}

export interface UpdateUserParams {
    name?: string;
    lastName?: string;
    password?: string;
}

export interface IUpdateUserRepository {
    updateUser(id: string, params: UpdateUserParams): Promise<User>;
}