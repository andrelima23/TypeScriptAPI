import { badRequest, ok } from '../helpers/helpers';
import { User } from '../models/user';
import { HttpRequest, HttpResponse } from '../protocols/control-protocols/http-protocols';
import { IUpdateUser, UpdateUserParams, IUpdateUserRepository } from '../repositories/update-user/iupdate-user';

export class UpdateUserController implements IUpdateUser {

    _updateUserRepository: IUpdateUserRepository;

    constructor(updateUserRepository: IUpdateUserRepository) {
        this._updateUserRepository = updateUserRepository;
    }

    async handle(httpRequest: HttpRequest<UpdateUserParams>): Promise<HttpResponse<User | string>> {
        try {
            const id = httpRequest?.params?.id;
            const body = httpRequest?.body;

            if(!id) {
                return badRequest("Id não informado")
            }

            if(!body) {
                return badRequest("Body não informado")
            }

            const user = await this._updateUserRepository.updateUser(id, body)

            return ok<User>(user)

        } catch (error) {
            return badRequest('error')
        }
    }

}