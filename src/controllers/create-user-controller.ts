import { User } from '../models/user';
import { HttpRequest, HttpResponse } from '../protocols/control-protocols/http-protocols';
import { ICreateUser, ICreateUserParams, ICreateUserRepository } from '../repositories/create-user/icreate-user';
import { badRequest, ok } from "../helpers/helpers";

export class CreateUserController implements ICreateUser {

    _createUserRepository: ICreateUserRepository;

    constructor(createUserRepository: ICreateUserRepository) {
        this._createUserRepository = createUserRepository;
    }

    async handle(httpRequest: HttpRequest<ICreateUserParams>): Promise<HttpResponse<User | string>> {
        try {
            const user = await this._createUserRepository.createUser(httpRequest.body!);

            if(!user) {
                return badRequest("Usuário não foi criado")
            }
            console.log(user)

            return ok<User>(user);

        } catch (error) {
            throw new Error('Method not implemented.');
        }
    }

}