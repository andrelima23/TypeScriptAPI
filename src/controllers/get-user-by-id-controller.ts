import { IGetUsersRepository, IGetUserById, IGetUserByIdRepository } from '../repositories/get-users/iget-users';
import { ok, serverError } from "../helpers/helpers";
import { HttpResponse } from "../protocols/control-protocols/http-protocols";
import { User } from '../models/user';

export class GetUserByIdController implements IGetUserById {
    
    _getUserRepository: IGetUserByIdRepository;

    constructor(getUserRepository: IGetUserByIdRepository) {
        this._getUserRepository = getUserRepository;
    }

    async handle(): Promise<HttpResponse<User | string>> {
        try {
            const user = await this._getUserRepository.getUserById();

            return ok<User>(user);
        } catch (error) {
            return serverError();
        }
    }
}