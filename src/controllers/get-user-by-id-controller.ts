import { IGetUserById, IGetUserByIdRepository } from '../repositories/get-users/iget-users';
import { badRequest, ok, serverError } from "../helpers/helpers";
import { HttpResponse, HttpRequest } from '../protocols/control-protocols/http-protocols';
import { User } from '../models/user';

export class GetUserByIdController implements IGetUserById {
    
    _getUserRepository: IGetUserByIdRepository;

    constructor(getUserRepository: IGetUserByIdRepository) {
        this._getUserRepository = getUserRepository;
    }

    async handle(httpRequest: HttpRequest<string>): Promise<HttpResponse<User | string>> {
        try {
            const id = httpRequest?.params?.id;

            if(!id) {
                return badRequest("Id não foi informado")
            }
            const user = await this._getUserRepository.getUserById(id);

            return ok<User>(user);
        } catch (error) {
            return serverError();
        }
    }
}