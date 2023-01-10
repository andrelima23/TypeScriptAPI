import { IGetUsers, IGetUsersRepository } from '../repositories/get-users/iget-users';
import { ok, serverError } from "./helpers";
import { HttpResponse, IController } from "./protocols";
import { User } from '../models/user';

export class GetUsersController implements IGetUsers {
    
    _getUserRepository: IGetUsersRepository;

    constructor(getUserRepository: IGetUsersRepository) {
        this._getUserRepository = getUserRepository;
    }

    async handle(): Promise<HttpResponse<User[] | string>> {
        try {
            const users = await this._getUserRepository.getUsers()

            return ok<User[]>(users);
        } catch (error) {
            return serverError();
            
        }
    }
}