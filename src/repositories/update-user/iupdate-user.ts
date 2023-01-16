import { User } from '../../models/user';
import { HttpResponse, HttpRequest } from '../../protocols/control-protocols/http-protocols';

export interface IUpdateUser {
    handle(httpRequest: HttpRequest<UpdateUserParams>): Promise<HttpResponse<User | string>>
}

export interface UpdateUserParams {
    firstName?: string;
    lastName?: string;
    password?: string;
}

export interface IUpdateUserRepository {
    updateUser(id: string, params: UpdateUserParams): Promise<User>;
}