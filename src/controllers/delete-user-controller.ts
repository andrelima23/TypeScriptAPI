import { badRequest, ok, serverError } from '../helpers/helpers';
import { User } from '../models/user';
import { HttpRequest, HttpResponse } from '../protocols/http-protocols';
import { IDeleteUser, IDeleteUserRepository } from '../repositories/delete-user/idelete-user';

export class DeleteUserController implements IDeleteUser {

    _deleteUserRepository: IDeleteUserRepository;

    constructor(deleteUserRepositoy: IDeleteUserRepository) {
        this._deleteUserRepository = deleteUserRepositoy;
    }
    
    async handle(httpRequest: HttpRequest<string>): Promise<HttpResponse<User | string>> {
        try {
            const id = httpRequest?.params?.id;

            if(!id)
                badRequest("Usuário não encontrado")
            
            const user = await this._deleteUserRepository.deleteUser(id)
            
            if(!user)
                badRequest("Usuário não encontrado")

            return ok<User>(user)

        } catch (error) {
            return serverError();
        }
    }
}